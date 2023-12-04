
class Prompt:
    def __init__(self, original, translation):
        self.original = original
        self.translation = translation


sentences = [
    Prompt("日本語がわかりますか？", "Do you know Japanese?"),
    Prompt("何時ですか？", "What time is it?"),
    Prompt("寿司を食べます。", "I eat sushi.")
]