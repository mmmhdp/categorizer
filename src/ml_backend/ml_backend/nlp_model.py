import os
import re
import nltk
import pickle
import pandas as pd
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords


class Model:
    def __init__(self):
        nltk_data_path = os.path.join(os.path.dirname(__file__), "nltk_data/")
        os.environ["NLTK_DATA"] = nltk_data_path

        vectorizer_file = os.path.join(os.path.dirname(
            __file__), "weights/TfidfVectorizer.pkl")
        with open(vectorizer_file, 'rb') as file:
            self.__vectorizer = pickle.load(file)

        encoder_file = os.path.join(os.path.dirname(
            __file__), "weights/LabelEncoder.pkl")
        with open(encoder_file, 'rb') as file:
            self.__encoder = pickle.load(file)

        model_file = os.path.join(
            os.path.dirname(__file__), "weights/model.pkl")
        with open(model_file, 'rb') as file:
            self.__model = pickle.load(file)

    def __cleaning_processing(self, sentence):
        stop_words = set(stopwords.words('english'))
        sentence = word_tokenize(sentence)
        sen = []
        for word in sentence:
            sentence = word.lower()
            sentence = re.sub(r"[^a-zA-Z]", "", sentence)
            if sentence not in stop_words:
                if sentence != '':
                    sen.append(sentence)
        filtered_sentence = " ".join(sen)
        return filtered_sentence

    def predict(self, text: str):
        df = pd.DataFrame(data=pd.DataFrame([{'data_txt': text}]))
        df['data_txt'] = df['data_txt'].apply(self.__cleaning_processing)
        feature = self.__vectorizer.transform(df['data_txt'])
        predicted_val = self.__model.predict(feature)
        return self.__encoder.inverse_transform(predicted_val)[0]
