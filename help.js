exports.help = function (options) {
  console.log(" * DubUtils 커맨드");
  console.log("  - buildenv : 빌드 환경 설정용 TypeScript파일 생성");
  console.log(`    기본값 : ${options.buildenv().searchThrough.join(", ")} 중 가장 먼저 찾아진 파일을 기준으로 환경설정 진행`);
  console.log("    options :");
  console.log(
    "      transpile : 빌드 환경 설정 후 지정된 폴더(transpileOutDir)에 js로 파일 생성"
  );
  console.log("");
  console.log(
    "  - copystring : 스트링 폴더 복사. 옵션의 searchThrough에 있는 파일 중 하나에 searchFor가 정의되어 있어야 함"
  );
  console.log(`    기본값 : ${options.copystring().searchThrough.join(", ")} 에서 ${options.copystring().searchFor}를 찾음`);
  console.log("");
  console.log(" * 사용 예시");
  console.log("  - dubutils buildenv");
  console.log("  - dubutils buildenv transpile");
  console.log("  - dubutils copystring");
};
