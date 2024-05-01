from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

from genisus import __version__ as version

setup(
	name="genisus",
	version=version,
	description="an education plkateform"
	author="yamsine",
	author_email= "yasmineslema9122001@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires,
)