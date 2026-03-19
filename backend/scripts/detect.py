import sys
import json
import os

def run_detection(image_path):
    """
    Simulation of YOLOv8 detection.
    In a real system, you'd load the model:
    from ultralytics import YOLO
    # Using the pretrained models provided by the user:
    # model = YOLO('../yolov8m.pt') # or yolov8n.pt
    # results = model(image_path)
    """
    
    # Mock result format
    detections = [
        {
            "class": "Engine Check",
            "confidence": 0.98,
            "box": [100, 150, 180, 230] # [x1, y1, x2, y2]
        },
        {
            "class": "Low Fuel",
            "confidence": 0.85,
            "box": [400, 150, 480, 230]
        }
    ]
    
    return json.dumps(detections)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        img_path = sys.argv[1]
        if os.path.exists(img_path):
            print(run_detection(img_path))
        else:
            print(json.dumps({"error": "Image not found"}))
    else:
        print(json.dumps({"error": "No image path provided"}))
