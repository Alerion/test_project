import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST


def index(request):
    return render(request, 'main/index.html')


def load_current_text(request):
    with open('/Users/admin/Workspace/test_project/book.txt') as f:
        text = f.read()

    output = {
        'text': text
    }
    return JsonResponse(output)


# FIXME: Use CSRF tocken
@csrf_exempt
@require_POST
def process_text(request):
    # TODO: add validation
    data = json.loads(request.body)
    output = {
        'text': data['text']
    }
    return JsonResponse(output)
