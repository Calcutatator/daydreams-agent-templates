#!/usr/bin/env python3
"""Daily briefing: emails + calendar events"""

import imaplib
import email
from email.header import decode_header
from datetime import datetime, timedelta, timezone
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import json


# Senders/subjects to filter out (spam, promos, newsletters)
FILTERED_SENDERS = [
    'buyagift',
    'budds',
    'adidas',
    'mytrip',
    'ethereum weekly',
]

def should_filter_email(from_addr, subject):
    """Check if email should be filtered out"""
    from_lower = from_addr.lower()
    subject_lower = subject.lower()
    for term in FILTERED_SENDERS:
        if term in from_lower or term in subject_lower:
            return True
    return False

def get_recent_emails(hours=24):
    """Get emails from the last N hours"""
    with open('/root/clawd/.credentials/gmail.json', 'r') as f:
        creds = json.load(f)
    
    mail = imaplib.IMAP4_SSL("imap.gmail.com")
    mail.login(creds['email'], creds['appPassword'])
    mail.select("INBOX")
    
    # Search for recent emails
    since_date = (datetime.now() - timedelta(hours=hours)).strftime("%d-%b-%Y")
    status, messages = mail.search(None, f'(SINCE "{since_date}")')
    email_ids = messages[0].split()
    
    emails = []
    for eid in email_ids[-50:]:  # Check more, filter down
        status, msg_data = mail.fetch(eid, "(RFC822)")
        for response_part in msg_data:
            if isinstance(response_part, tuple):
                msg = email.message_from_bytes(response_part[1])
                subject, encoding = decode_header(msg["Subject"])[0]
                if isinstance(subject, bytes):
                    subject = subject.decode(encoding or "utf-8", errors='replace')
                from_ = msg.get("From", "Unknown")
                # Clean up from address
                if '<' in from_:
                    from_ = from_.split('<')[0].strip().strip('"')
                
                # Skip filtered emails
                if should_filter_email(from_, subject):
                    continue
                    
                emails.append({'from': from_, 'subject': subject})
    
    mail.logout()
    return emails

def get_upcoming_events(days=7):
    """Get calendar events for the next N days"""
    with open('/root/clawd/.credentials/google-calendar-token.json', 'r') as f:
        token_data = json.load(f)
    
    creds = Credentials(
        token=token_data['token'],
        refresh_token=token_data['refresh_token'],
        token_uri=token_data['token_uri'],
        client_id=token_data['client_id'],
        client_secret=token_data['client_secret'],
        scopes=token_data['scopes']
    )
    
    service = build('calendar', 'v3', credentials=creds)
    
    now = datetime.now(timezone.utc)
    end = now + timedelta(days=days)
    
    events_result = service.events().list(
        calendarId='primary',
        timeMin=now.isoformat(),
        timeMax=end.isoformat(),
        maxResults=20,
        singleEvents=True,
        orderBy='startTime'
    ).execute()
    
    events = []
    for event in events_result.get('items', []):
        start = event['start'].get('dateTime', event['start'].get('date'))
        summary = event.get('summary', '(No title)')
        events.append({'start': start, 'summary': summary})
    
    return events

def format_briefing():
    """Format the daily briefing message"""
    today = datetime.now().strftime("%A, %B %d")
    
    lines = [f"☀️ **Good morning! Here's your briefing for {today}**\n"]
    
    # Emails
    try:
        emails = get_recent_emails(24)
        if emails:
            lines.append(f"📧 **Emails (last 24h):** {len(emails)} received")
            for e in emails[:10]:  # Show max 10
                lines.append(f"  • {e['from'][:30]}: {e['subject'][:50]}")
            if len(emails) > 10:
                lines.append(f"  ... and {len(emails) - 10} more")
        else:
            lines.append("📧 **Emails:** None in the last 24h")
    except Exception as ex:
        lines.append(f"📧 **Emails:** Error fetching ({ex})")
    
    lines.append("")
    
    # Calendar
    try:
        events = get_upcoming_events(7)
        if events:
            lines.append(f"📅 **Calendar (next 7 days):** {len(events)} events")
            for e in events[:10]:
                start = e['start']
                if 'T' in start:
                    dt = datetime.fromisoformat(start.replace('Z', '+00:00'))
                    start = dt.strftime("%a %d %b, %H:%M")
                else:
                    dt = datetime.fromisoformat(start)
                    start = dt.strftime("%a %d %b")
                lines.append(f"  • {start}: {e['summary']}")
            if len(events) > 10:
                lines.append(f"  ... and {len(events) - 10} more")
        else:
            lines.append("📅 **Calendar:** No events in the next 7 days")
    except Exception as ex:
        lines.append(f"📅 **Calendar:** Error fetching ({ex})")
    
    lines.append("\nHave a great day! 💀")
    
    return "\n".join(lines)

if __name__ == "__main__":
    print(format_briefing())
