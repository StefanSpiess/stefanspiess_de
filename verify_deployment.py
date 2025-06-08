#!/usr/bin/env python3
"""
Deployment verification script for stefanspiess.de Dark Mode fix
"""

import requests
import time
import re
from datetime import datetime

def check_live_deployment():
    """Check if the latest changes are deployed to the live website"""
    print(f"🚀 Deployment Verification - {datetime.now().strftime('%H:%M:%S')}")
    print("=" * 50)
    
    # Check if index.html has the cache-busting parameter
    try:
        response = requests.get("https://stefanspiess.de/index.html", timeout=10)
        response.raise_for_status()
        content = response.text
        
        # Look for the cache-busting parameter
        cache_bust_pattern = r'script\.js\?v=\d+'
        has_cache_bust = bool(re.search(cache_bust_pattern, content))
        
        print(f"📄 index.html cache-busting: {'✅ Found' if has_cache_bust else '❌ Missing'}")
        
        if has_cache_bust:
            # Extract version
            match = re.search(r'script\.js\?v=(\d+)', content)
            version = match.group(1) if match else "unknown"
            print(f"🔢 Cache-bust version: {version}")
        
        # Check for Dark Mode button
        has_theme_toggle = 'id="themeToggle"' in content
        print(f"🌙 Dark Mode button: {'✅ Found' if has_theme_toggle else '❌ Missing'}")
        
        return has_cache_bust and has_theme_toggle
        
    except Exception as e:
        print(f"❌ Error checking deployment: {e}")
        return False

def test_dark_mode_script():
    """Test if the Dark Mode script is accessible with cache-busting"""
    try:
        response = requests.get("https://stefanspiess.de/script.js?v=20250608", timeout=10)
        response.raise_for_status()
        content = response.text
        
        # Check for Dark Mode functions
        dark_mode_functions = [
            "function initTheme",
            "function toggleTheme",
            "function applyTheme",
            "data-theme"
        ]
        
        found_functions = sum(1 for func in dark_mode_functions if func in content)
        print(f"🔧 Dark Mode functions: {found_functions}/{len(dark_mode_functions)} found")
        
        return found_functions == len(dark_mode_functions)
        
    except Exception as e:
        print(f"❌ Error checking script: {e}")
        return False

def main():
    """Main verification process"""
    print("🔍 Checking stefanspiess.de deployment status...")
    print("This script checks if the Dark Mode fixes are live.\n")
    
    # Check deployment
    deployment_ok = check_live_deployment()
    script_ok = test_dark_mode_script()
    
    print("\n" + "=" * 50)
    
    if deployment_ok and script_ok:
        print("🎉 SUCCESS: Dark Mode fix is deployed!")
        print("\n📋 Next steps:")
        print("1. Visit https://stefanspiess.de")
        print("2. Hard refresh with Ctrl+F5 (or Cmd+Shift+R on Mac)")
        print("3. Click the 🌙/☀️ button to test Dark Mode")
        print("4. Check that theme persists when refreshing page")
    else:
        print("⏳ Deployment not complete yet.")
        print("\n📋 Troubleshooting:")
        if not deployment_ok:
            print("- index.html may still be cached by the web server")
        if not script_ok:
            print("- script.js may not be accessible or missing functions")
        print("- Try running this script again in 5-10 minutes")
        print("- Some hosting providers take time to update files")
    
    print(f"\n🕒 Last checked: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    main()
