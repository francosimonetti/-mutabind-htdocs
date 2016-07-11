#!/web/public/data/projects/mutabind/env/bin/iotbx.python


# The shebang should point to the Python executable in whatever virtualenv you have your requirements installed in.
import sys, os

sys.path.insert(0, "/web/public/data/projects/mutabind/prj-sunddg")


# Set the DJANGO_SETTINGS_MODULE environment variable.
os.environ['DJANGO_SETTINGS_MODULE'] = "prj.settings"
 
from django.core.servers.fastcgi import runfastcgi
runfastcgi(method="threaded", daemonize="false")
