
import sys,json,struct
from pyautogui import typewrite

# Read a data from stdin and decode it.
def getData():
    rawLength = sys.stdin.buffer.read(4)
    if len(rawLength) == 0:
        sys.exit(0)
    dataLength = struct.unpack('@I', rawLength)[0]
    data = sys.stdin.buffer.read(dataLength).decode('utf-8')
    return eval(data)
    # return json.loads(data)

# Encode a data for transmission,
# given its content.
def encodeData(dataContent):
    encodedContent = json.dumps(dataContent).encode('utf-8')
    # encodedContent = bytes(dataContent,'utf-8')
    encodedLength = struct.pack('@I', len(encodedContent))
    return {'length': encodedLength, 'content': encodedContent}

# Send an encoded data to stdout
def sendData(encodedData):
    sys.stdout.buffer.write(encodedData['length'])
    sys.stdout.buffer.write(encodedData['content'])
    # sys.stdout.buffer.flush()
    sys.stdout.close()

try:   
    data = getData()
    typewrite('@{}\n'.format(data['m']))
    data['e']=0
except Exception as e:
    data['e']=e


sendData(encodeData(data))