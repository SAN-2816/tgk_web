import React from "react";
import { Typography } from "@material-ui/core/";
function Marketing() {
  const string = `
  마케팅 정보 수신동의

  1. 광고성 정보의 이용목적
  주식회사 포핍스가 제공하는 퇴직금 서비스 및 상품 추천, 각종 경품 행사, 이벤트 등의 광고성 정보를 전자우편이나 서신우편, 문자(SMS 또는 카카오 알림톡), 푸시, 전화 등을 통해 이용자에게 제공합니다.
  
  - 마케팅 수신 동의는 거부하실 수 있으며 동의 이후에라도 고객의 의사에 따라 동의를 철회할 수 있습니다. 동의를 거부하시더라도 주식회사 포핍스가 제공하는 서비스의 이용에 제한이 되지 않습니다. 단, 할인, 이벤트 및 이용자 맞춤형 상품 추천 등의 마케팅 정보 안내 서비스가 제한됩니다.
  
  2. 미동의 시 불이익 사항
  개인정보보호법 제22조 제5항에 의해 선택정보 사항에 대해서는 동의 거부하시더라도 서비스 이용에 제한되지 않습니다. 단, 할인, 이벤트 및 이용자 맞춤형 상품 추천 등의 마케팅 정보 안내 서비스가 제한됩니다.
  
  3. 서비스 정보 수신 동의 철회
  퇴직금에서 제공하는 마케팅 정보를 원하지 않을 경우 ‘4peeps.san@gmail.com’을 통해서 철회를 요청할 수 있습니다. 또한 향후 마케팅 활용에 새롭게 동의하고자 하는 경우에는 ‘4peeps.san@gmail.com’에서 동의하실 수 있습니다.
  
  시행일자 : 2020년 02월 14일`;
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        마케팅 정보 수신 동의
      </Typography>
      {string.split("\n").map((i, key) => {
        return (
          <Typography key={key} variant="body2" gutterBottom>
            {i}
          </Typography>
        );
      })}
    </div>
  );
}
export default Marketing;
