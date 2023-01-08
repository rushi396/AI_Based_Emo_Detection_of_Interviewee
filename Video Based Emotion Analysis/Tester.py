from Decomposer.Decomposer import *

decomposer=Decomposer()
decomposer.setVideoFile("./Testing_Inputs/Sample_Video_P45.avi")
images_array=decomposer.getImageArrayOfIntervals()
print(len(images_array))
print(images_array[0].shape)
decomposer.convertVideoToAudio()
decomposer.convertAudioToText(model_path="../Utils/vosk-model-small-en-us-0.15",mono_sound_path="./Segmented_Outputs/Audio/mono_sound.wav",output_transcript_file_path="./Segmented_Outputs/Text/transcript.json",output_timestamp_json_path="./Segmented_Outputs/Text/timestamp.json"
)