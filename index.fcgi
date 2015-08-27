#!/web/public/data/projects/sunddg/env/bin/iotbx.python
#/net/mwebdev2/export/home/web/public/htdocs/projects/sunddg/django/env/bin/python



# The shebang should point to the Python executable in whatever virtualenv you have your requirements installed in.
import sys, os

sys.path.insert(0, "/web/public/data/projects/sunddg/prj-sunddg")

# set CCTBX paths
# os.environ["LIBTBX_BUILD"] = "/net/mwebdev2/export/home/web/public/htdocs/projects/sunddg/django/bin/cctbx_build"
# sys.path.append('/net/mwebdev2/export/home/web/public/htdocs/projects/sunddg/django/bin/cctbx_sources/boost_adaptbx')
# sys.path.append('/net/mwebdev2/export/home/web/public/htdocs/projects/sunddg/django/bin/cctbx_sources/')
# sys.path.append('/net/mwebdev2/export/home/web/public/htdocs/projects/sunddg/django/bin/cctbx_sources/libtbx/pythonpath')
# sys.path.append('/net/mwebdev2/export/home/web/public/htdocs/projects/sunddg/django/bin/cctbx_build/lib') 
# sys.path.append('/net/mwebdev2/export/home/web/public/htdocs/projects/sunddg/django/bin/cctbx_build/bin') 
# sys.path.append("/net/mwebdev2/export/home/web/public/htdocs/projects/sunddg/django/bin/cctbx_build")


# from subprocess import call
# subprocess.call(["sh", "libtbx_env_var.sh"])


# Set the DJANGO_SETTINGS_MODULE environment variable.
os.environ['DJANGO_SETTINGS_MODULE'] = "prj.settings"
 
from django.core.servers.fastcgi import runfastcgi
runfastcgi(method="threaded", daemonize="false")
