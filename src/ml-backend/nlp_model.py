import re
import nltk
import pickle
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score,confusion_matrix
from sklearn.svm import LinearSVC


class Model:
    def __init__(self):
      nltk.download('punkt')
      nltk.download('stopwords')
      vectorizer_file = "drive/MyDrive/Colab_Notebooks/proj/pickle_dump/TfidfVectorizer.pkl"
      with open(vectorizer_file, 'rb') as file:
        self.vectorizer = pickle.load(file)

      encoder_file = "drive/MyDrive/Colab_Notebooks/proj/pickle_dump/LabelEncoder.pkl"
      with open(encoder_file, 'rb') as file:
        self.encoder = pickle.load(file)

      model_file = "drive/MyDrive/Colab_Notebooks/proj/pickle_dump/model.pkl"
      with open(model_file, 'rb') as file:
        self.model = pickle.load(file)

    def cleaning_processing(self, sentance):
      stop_words=set(stopwords.words('english'))
      sentance=word_tokenize(sentance)  
      sen=[]
      for i in sentance:
          sentance=i.lower()   
          sentance=re.sub(r"[^a-zA-Z]","",sentance) 
          if sentance not in stop_words:
              if sentance != '': 
                  sen.append(sentance)
      filtered_sentence = " ".join(sen)  
      return filtered_sentence

    def predict(self, text: str):
      df = pd.DataFrame(data = pd.DataFrame([{'data_txt' : text}]))
      df['data_txt'] = df['data_txt'].apply(self.cleaning_processing)
      feature = self.vectorizer.transform(df['data_txt'])
      predicted_val = self.model.predict(feature)
      return self.encoder.inverse_transform(predicted_val)[0]
