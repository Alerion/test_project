# Install

```
$ python3 -m venv venv
$ . venv/bin/activate
$ pip install -r requirements.txt
$ ./manage.py migrate
$ ./manage.py runserver
```

# Notes

Project uses model trained only with uploaded text.

Clicking on a sentence fails sometime, but animation still played.
Looks like click-box is smaller the container.
