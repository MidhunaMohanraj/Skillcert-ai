import cv2
import base64
import json
from groq import Groq

GROQ_API_KEY = "your_groq_key_here"
def extract_frames(video_path, every_n_seconds=2):
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    if fps == 0: fps = 25
    frames = []
    count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if count % int(fps * every_n_seconds) == 0:
            _, buffer = cv2.imencode(".jpg", frame)
            b64 = base64.b64encode(buffer).decode("utf-8")
            frames.append(b64)
        count += 1
    cap.release()
    return frames[:5]

def analyze_video(video_path):
    print("Extracting frames...")
    frames = extract_frames(video_path)
    print(f"Got {len(frames)} frames")
    
    client = Groq(api_key=GROQ_API_KEY)
    
    content = []
    for frame in frames:
        content.append({
            "type": "image_url",
            "image_url": {
                "url": f"data:image/jpeg;base64,{frame}"
            }
        })
    
    content.append({
        "type": "text",
        "text": "You are a clinical CPR assessor. Analyze these video frames. Return ONLY valid JSON with these exact fields: hand_placement (Pass/Fail), arm_position (Pass/Fail), compression_rate (0-10), chest_recoil (Pass/Partial/Fail), rhythm_consistency (Pass/Fail), overall_result (Pass/Fail), feedback (2-3 sentences), failed_criteria (array)"
    })
    
    print("Sending to Groq...")
    response = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        max_tokens=1000,
        messages=[{"role": "user", "content": content}]
    )
    
    result_text = response.choices[0].message.content
    print("Raw result:", result_text)
    clean = result_text.replace("```json", "").replace("```", "").strip()
    return json.loads(clean)

result = analyze_video("test_video.mp4")
print(json.dumps(result, indent=2))
