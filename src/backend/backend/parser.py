import requests
import string
from googletrans import Translator
from bs4 import BeautifulSoup


class Parser:

    def __init__(self):
        pass

    def get_en_data_for_model_by_url(self, url: str) -> str:
        data_for_model = " ".join(self.__parse_page(url, "en"))
        return data_for_model

    def __parse_page(self, url: str, output_lang: str = "en") -> list[str]:
        html_doc = self.__get_html_by_url(url)
        url = url

        pr_html_doc = self.__get_preprocessed_text(html_doc)
        pr_url = self.__get_preprocessed_text(url, is_url=True)

        raw_corpus = self.__get_raw_corpus(pr_html_doc, pr_url)

        match output_lang:
            case "en":
                translated_corpus = self.__translate_to_eng(raw_corpus)
            case _:
                translated_corpus = self.__translate_to_eng(raw_corpus)

        return translated_corpus

    def __get_html_by_url(self, url: str) -> str:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, "html.parser")
                return soup.get_text()
        except Exception as e:
            return " "

    def __get_preprocessed_text(self, text: str, is_url: bool = False) -> list[str]:
        text = text.translate(str.maketrans(string.digits, " " * len(string.digits)))
        text = text.translate(str.maketrans(string.punctuation, " " * len(string.punctuation)))
        if is_url:
            return text.split()[:10]
        return text.split()

    def __get_raw_corpus(self, pr_html_doc: list[str], pr_url: list[str]):
        return pr_html_doc + pr_url

    def __translate_to_eng(self, corpus: list[str]) -> list[str]:
        trans = Translator()
        for ind, word in enumerate(corpus):
            try:
                detected_lang = trans.detect(word).lang
                word_in_eng = trans.translate(word, src=detected_lang, dest="en").text
                corpus[ind] = word_in_eng
            except ValueError as e:
                corpus[ind] = " "

        return corpus