import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .text_processing import create_model, save_model, load_model, dump_corpus, load_corpus


def index(request):
    return render(request, 'main/index.html')


def load_current_text(request):
    return JsonResponse(_get_data_from_session(request))


# FIXME: Use CSRF tocken
@csrf_exempt
@require_POST
def process_text(request):
    # TODO: add validation
    data = json.loads(request.body)
    text = data['text']
    model, corpus = create_model(text)
    request.session['text'] = text
    request.session['path'] = save_model(model)
    request.session['corpus'] = dump_corpus(corpus)
    return JsonResponse(_get_data_from_session(request))


def get_similarity(request):
    sentence_id = request.GET['sentence_id']
    model = load_model(request.session['path'])
    corpus = load_corpus(request.session['corpus'])

    similarity = {}
    for i, sentence in enumerate(corpus):
        similarity[i] = model.docvecs.similarity(int(sentence_id), i)
    sorted_similarity = sorted(similarity.items(), key=lambda item: item[1], reverse=True)

    similar = []
    for i, value in sorted_similarity[:20]:
        similar.append({
            'value': float(value),
            'sentence': corpus[i].original
        })

    return JsonResponse({'similar': similar})


def _get_data_from_session(request):
    sentences = []
    for row in request.session.get('corpus', []):
        sentences.append(row['original'])

    return {
        'text': request.session.get('text', ''),
        'sentences': sentences
    }
