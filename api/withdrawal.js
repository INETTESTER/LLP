import http from 'k6/http';
import { SharedArray } from 'k6/data'; ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)

const data = new SharedArray('rider_id', function () { ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)
  return JSON.parse(open('../file/rider_id.json')); ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)
});

export function withdrawal(scenario) {
  const rider_id = data[scenario.iterationInTest % data.length];
  const url = 'https://llpbackoffice-api-test.one.th/api/v1/third-party/health-rider/transactions/withdrawal';
  //console.log(rider_id.rider_id);

  const payload = JSON.stringify({
    rider_id: rider_id.rider_id,
    withdrawal: 1.00,
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