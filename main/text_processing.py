from collections import namedtuple
from tempfile import mkstemp

from gensim.summarization.textcleaner import get_sentences
from gensim.models.doc2vec import TaggedDocument, Doc2Vec
from gensim.utils import simple_preprocess

from django.conf import settings


class TaggedDocument(namedtuple('TaggedDocument', 'words tags original')):
    """ Based on gensim's TaggedDocument. "original" field is added. """
    # FIXME: Extend class to keep all methods.

    def __str__(self):
        return '%s(%s, %s)' % (self.__class__.__name__, self.words, self.tags)


def create_corpus(text):
    text = text.replace('\n', '')
    for i, sentence in enumerate(get_sentences(text)):
        yield TaggedDocument(simple_preprocess(sentence), [i], sentence)


def create_model(text):
    train_corpus = list(create_corpus(text))
    model = Doc2Vec(train_corpus, vector_size=50, min_count=2, epochs=40, train_lbls=False)
    model.train(train_corpus, total_examples=model.corpus_count, epochs=model.epochs)
    return model, train_corpus


def save_model(model):
    # TODO: cleanup folder
    _, path = mkstemp(prefix='model_', dir=settings.MODELS_CACHE_DIR)
    model.save(path)
    return path


def load_model(path):
    model = Doc2Vec.load(path)
    return model


def dump_corpus(corpus):
    output = []
    for item in corpus:
        output.append(item._asdict())
    return output


def load_corpus(data):
    corpus = []
    for row in data:
        corpus.append(TaggedDocument(row['words'], row['tags'], row['original']))
    return corpus
