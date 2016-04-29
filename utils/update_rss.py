#!/usr/bin/python

import subprocess
from datetime import datetime
import string

needbuild = False
now = datetime.now()
fetchDates = subprocess.check_output("curl localhost:4000/events_feed.xml --silent | grep endDate | sed 's#<[^>]*>##g' | sed 's# [+-].*$#\&#' | xargs", shell=True)
eventDates = fetchDates.split("&")

for d in eventDates:
    d = d.strip()
    if len(d) != 0:
        date_object = datetime.strptime(d, '%a, %d %b %Y %H:%M:%S')
        # Sample Date Format: Thu, 24 Mar 2016 20:00:00 +0000
        if now > date_object:
            print "Event has passed\n[INFO] Current Date:", now, "Event Date:", date_object
            needbuild = True
            break
        else:
            print "Event is in the future\n[INFO] Current Date:", now, "Event Date:", date_object

if needbuild:
    print "There is an event that has passed. Will update RSS feeds."
    print "Commiting"
    subprocess.call("git commit -m 'Rebuilding site to update RSS feeds' --allow-empty")
    print "Pushing to github.com/capitalonecanada/capitalonecanada.github.io"
    subprocess.call("git push origin dev:dev")
