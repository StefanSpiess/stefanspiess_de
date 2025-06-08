#!/usr/bin/env python3
"""
Debug script to compare local and live website Dark Mode functionality
"""

import requests
import hashlib
import os
from urllib.parse import urljoin

# Configuration
LOCAL_URL = "http://localhost:8080"
LIVE_URL = "https://stefanspiess.de"
FILES_TO_CHECK = [
    "script.js",
    "index.html",
    "styles.css"
]

def get_file_hash(content):
    """Calculate MD5 hash of file content"""
    return hashlib.md5(content.encode('utf-8')).hexdigest()

def fetch_content(url):
    """Fetch content from URL"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.text
    except Exception as e:
        return f"ERROR: {str(e)}"

def check_dark_mode_in_script(content):
    """Check if Dark Mode functions are present in script"""
    dark_mode_indicators = [
        "function initTheme",
        "function toggleTheme", 
        "function applyTheme",
        "data-theme",
        "THEME_KEY"
    ]
    
    found = []
    for indicator in dark_mode_indicators:
        if indicator in content:
            found.append(indicator)
    
    return found

def main():
    print("🔍 Dark Mode Live Website Debug Tool")
    print("=" * 50)
    
    for filename in FILES_TO_CHECK:
        print(f"\n📄 Checking {filename}:")
        print("-" * 30)
        
        # Get local version
        local_url = urljoin(LOCAL_URL, filename)
        local_content = fetch_content(local_url)
        
        # Get live version
        live_url = urljoin(LIVE_URL, filename)
        live_content = fetch_content(live_url)
        
        if local_content.startswith("ERROR") or live_content.startswith("ERROR"):
            print(f"❌ Error fetching {filename}")
            print(f"Local: {local_content if local_content.startswith('ERROR') else 'OK'}")
            print(f"Live: {live_content if live_content.startswith('ERROR') else 'OK'}")
            continue
        
        # Compare hashes
        local_hash = get_file_hash(local_content)
        live_hash = get_file_hash(live_content)
        
        print(f"Local hash:  {local_hash}")
        print(f"Live hash:   {live_hash}")
        
        if local_hash == live_hash:
            print("✅ Files are identical")
        else:
            print("❌ Files are different!")
            
            if filename == "script.js":
                print("\n🌙 Dark Mode function check:")
                local_dm = check_dark_mode_in_script(local_content)
                live_dm = check_dark_mode_in_script(live_content)
                
                print(f"Local Dark Mode functions: {len(local_dm)}/5")
                print(f"Live Dark Mode functions:  {len(live_dm)}/5")
                
                if len(local_dm) > len(live_dm):
                    print("❌ Live version is missing Dark Mode functions!")
                    missing = set(local_dm) - set(live_dm)
                    print(f"Missing: {missing}")
    
    print("\n" + "=" * 50)
    print("🎯 Next steps:")
    print("1. If files are different, upload the local version")
    print("2. Clear browser cache (Ctrl+F5)")
    print("3. Test Dark Mode toggle on live site")
    print("4. Check browser console for JavaScript errors")

if __name__ == "__main__":
    main()
