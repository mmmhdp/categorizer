import random
from collections import namedtuple


class CacheLayer:
    def __init__(self):
        self.__cache = dict()

    def is_cached(self, pair_id: int) -> bool:
        try:
            pair = self.__cache[pair_id]
        except KeyError as e:
            return False
        return True

    def get_topic_by_pair_id(self, pair_id: int) -> str:
        return self.__cache[pair_id].topic

    def save(self, key_url: str, topic: str) -> int:
        CachedPair = namedtuple("cached_pair", ["url", "topic"])
        cached_pair = CachedPair(url=key_url, topic=topic)
        new_pair_id = random.randint(1, 1000000000000)
        while self.is_cached(new_pair_id):
            new_pair_id += 1
        self.__cache[new_pair_id] = cached_pair
        return new_pair_id
