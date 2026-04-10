import http from 'k6/http';
import { SharedArray } from 'k6/data'; ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)

const data = new SharedArray('one_id', function () { ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)
  return JSON.parse(open('../file/one_id.json')); ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)
});

export function withdrawal_oneid(scenario) {
  const one_id = data[scenario.iterationInTest % data.length];
  const url = 'https://llpbackoffice-api-test.one.th/api/v1/third-party/health-rider/one-id/transactions/withdrawal';

  //console.log(one_id.one_id);

  const payload = JSON.stringify({
    withdrawal: 1.00,
    one_id: one_id.one_id,
  });

  const params = {
    headers: {
      'Client-Id': '6',
      'Client-Secret': '$2a$10$r16Sk70UThHAFYSPUVUS7eV9nv/ZIja9KNOTmExcrCTxJrpbHSu1C',
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);

  //console.log('Response body:', response.body);

  return response;
}