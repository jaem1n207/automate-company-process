# Automate company process

여러 팀에서 개발하며 번역 작업에 시간을 쏟는 게 아까웠습니다. 그래서 번역 프로세스 간소화 웹 사이트와 스크립트를 작성했습니다.

B팀은 로컬 파일의 *.lang.json에 번역문구들을 저장하므로 웹 사이트에선 스크립트를 실행하지 않습니다. B 프로젝트의 node script를 실행하시면 됩니다.

--- 사용 방법 ---

A팀: 
1. 첫 진입 시, 에디터팀을 선택합니다.
2. 번역을 원하는 텍스트를 입력 후, 번역하기 버튼을 누릅니다. (특수문자로만 이루어져선 안 됩니다.)
3. 번역한 결과(kr, en, ja, vi)를 확인합니다.
4. 결과를 수정하고 싶다면 Input의 오른쪽에 있는 수정하기 버튼을 누르고 수정한 뒤 저장합니다.
5. 각 Input의 최우측에 위치한 복사하기 버튼을 눌러 클립보드에 복사하고 [locize](https://locize.com/)에 붙여넣습니다.

B팀:
1. 위 웹사이트가 아닌, 대시보드 프로젝트에서 `npm run translate` 명령어를 실행합니다.
2. key를 입력합니다. 하나의 *.lang.json 파일에라도 이미 키가 존재한다면 다시 입력합니다. (camelCase 형식이어야 하며, 특수문자로만 이루어져선 안 됩니다.)
3. 번역을 원하는 텍스트를 입력합니다. (특수문자로만 이루어져선 안 됩니다.)
4. 번역한 결과(kr, en, ja, vi)가 각 *.lang.json의 마지막 라인에 자동으로 추가됩니다. + 스타일 포맷팅


### Web
![web-translate-test](https://user-images.githubusercontent.com/50766847/224696672-7cf5aa8b-4e53-4ae0-8770-9924bead50b6.gif)

### Script
![script-translate-test](https://user-images.githubusercontent.com/50766847/224702638-65d07c24-4991-4797-a6c7-78b3e5c8e1d3.gif)

