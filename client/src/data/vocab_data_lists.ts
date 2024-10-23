import Vocab from "@/entities/Vocab";
import VocabByTopic from "@/entities/VocabByTopic";

const vocab_data : VocabByTopic[] = [
    {
        _id: "1",
        topic_name: "Topic 1",
        vocabs: [
            {
                _id: "1",
                word: "Hello",
                meaning_en: "Say hi to someone",
                meaing_vn: "Xin Chào",
                image_word: "https://images.unsplash.com/photo-1729603483130-453cb9e49593?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NXx8fGVufDB8fHx8fA%3D%3D",
                audio_word: "https://www.soundjay.com/button/beep-07.wav",
                topic_id: "1",
                created_at: "2021-10-10",
                updated_at: "2021-10-10",
                ex_sentence: "Hello, my name is John",
                ipa_spelling: "həˈloʊ"
            },
            {
                _id: "2",
                word: "Goodbye",
                meaning_en: "Say goodbye to someone",
                meaing_vn: "Tạm biệt",
                image_word: "https://images.unsplash.com/photo-1729603483130-453cb9e49593?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NXx8fGVufDB8fHx8fA%3D%3D",
                audio_word: "https://www.soundjay.com/button/beep-07.wav",
                topic_id: "1",
                created_at: "2021-10-10",
                updated_at: "2021-10-10",
                ipa_spelling: "həˈloʊ",
                ex_sentence: "Goodbye, see you later",
            }
        ],
        image_background: "https://images.unsplash.com/photo-1729603483130-453cb9e49593?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NXx8fGVufDB8fHx8fA%3D%3D",
        created_at: "created_at 1",
        updated_at: "updated_at 1"
    },
    {
        _id: "2",
        topic_name: "Topic 2",
        vocabs: [
            {
                _id: "1",
                word: "Hello",
                meaning_en: "Say hi to someone",
                meaing_vn: "Xin Chào",
                image_word: "https://images.unsplash.com/photo-1728876027996-942383f8fe38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
                audio_word: "https://www.soundjay.com/button/beep-07.wav",
                topic_id: "1",
                created_at: "2021-10-10",
                updated_at: "2021-10-10",
                ex_sentence: "Hello, my name is John",
                ipa_spelling: "həˈloʊ"
            },
            {
                _id: "2",
                word: "Goodbye",
                meaning_en: "Say goodbye to someone",
                meaing_vn: "Tạm biệt",
                image_word: "https://images.unsplash.com/photo-1627937870667-7e0c5d4b7d4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
                audio_word: "https://www.soundjay.com/button/beep-07.wav",
                topic_id: "1",
                created_at: "2021-10-10",
                updated_at: "2021-10-10",
                ex_sentence: "Goodbye, see you later",
            }
        ],
        image_background: "https://images.unsplash.com/photo-1729594025852-27aaf9c22a7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D",
        created_at: "created_at 2",
        updated_at: "updated_at 2"
    },
    {
        _id: "3",
        topic_name: "Topic 3",
        vocabs: [
            {
                _id: "1",
                word: "Hello",
                meaning_en: "Say hi to someone",
                meaing_vn: "Xin Chào",
                image_word: "https://images.unsplash.com/photo-1728876027996-942383f8fe38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
                audio_word: "https://www.soundjay.com/button/beep-07.wav",
                topic_id: "1",
                created_at: "2021-10-10",
                updated_at: "2021-10-10",
                ex_sentence: "Hello, my name is John",
                ipa_spelling: "həˈloʊ"
            },
            {
                _id: "2",
                word: "Goodbye",
                meaning_en: "Say goodbye to someone",
                meaing_vn: "Tạm biệt",
                image_word: "https://images.unsplash.com/photo-1627937870667-7e0c5d4b7d4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
                audio_word: "https://www.soundjay.com/button/beep-07.wav",
                topic_id: "1",
                created_at: "2021-10-10",
                updated_at: "2021-10-10",
                ex_sentence: "Goodbye, see you later",
            }
        ],
        image_background: "https://images.unsplash.com/photo-1729594025852-27aaf9c22a7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D",
        created_at: "created_at 3",
        updated_at: "updated_at 3"
    }
]

export default vocab_data;