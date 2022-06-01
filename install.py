ext_maifest="manifest.json"
native_manifest="app_manifest.json"
native_app="WhatsAppMention.exe"

import os ,json

dir_path = os.path.dirname(os.path.realpath(__file__))

with open(native_manifest,'r') as manifest_file:
    native_manifest_json=json.load(manifest_file)

with open(ext_maifest,'r') as manifest_file:
    ext_manifest_json=json.load(manifest_file)

app_name=native_manifest_json['name']
app_title=ext_manifest_json['name']

print('*** {} from CSA Apps ***\n'.format(app_title))

print('To add the extension to Chrome, follow these steps')
print('\n1) Open Chrome & goto Menu->More tools->Extensions')
print('2) Turn on developer mode')
print('3) Click on "Load Unpacked"')
print('4) Browse & Select this extracted extension folder')
print("\nNow you have added the extesnion to Chrome.")
print('(Now you can disable developer mode)')

if(native_manifest):
    add_to_reg='REG ADD "HKCU\\Software\\Google\\Chrome\\NativeMessagingHosts\\{}" /ve /t REG_SZ /d "{}\\{}" /f'.format(app_name ,dir_path,native_manifest)

    print('\nTo communicate with native app, need to add the some details to the Windows Registry')
    print('\n5) Goto {}->Details in Chrome extensions page'.format(app_title))
    print('6) Copy the id from address bar & paste it here (Ex:- abcdefghigklmnopqrstuvwxyzabcdea)')    
   
    id=input('ID: ')
    native_manifest_json['path']='{}\\{}'.format(dir_path,native_app)
    native_manifest_json['allowed_origins'][0]='chrome-extension://{}/'.format(id)

    print("\nAdding required details . . .")
     
    with open(native_manifest,'w') as manifest_file:
        json.dump(native_manifest_json, manifest_file)
   
    print(os.popen(add_to_reg).read()) 
    
print('\nDone')

i=input()
# os.popen(install_ext_cmd.format(dir_path))
# print(dir_path)
