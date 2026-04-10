import http from 'k6/http';
import { SharedArray } from 'k6/data'; ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)

const data = new SharedArray('pv_no', function () { ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)
    return JSON.parse(open('../file/pv_no.json')); ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)
});

export function callback(scenario) {
    const pv_no = data[scenario.iterationInTest % data.length];
    const url = 'https://llpbackoffice-api-test.one.th/callback/e-withholding/payment-vouchers';

    const payload = JSON.stringify({
        event: 'funds_transfer_status',
        tax_id: '0105565071941',
        payer_source_type: 'project',
        payer_source_name: 'Health Rider (LLP)',
        timestamp: '2025-09-04T01:46:59.014031+07:00',
        Data: {
            transaction_ref: 'Tn20250627000001',
            pv_no: '' + pv_no.pv_no,
            pv_date: 'PR175092',
            receiver_account_name: 'ณพิชญา วุฒิภัคธนากุล',
            receiver_account_type: 'account',
            receiver_account_no: '020143935797',
            receiver_bank_code: '030',
            supplier_amount: 90,
            fee_deduction_amount: 0,
            supplier_amount_after_fee_deduction: 90,
            transfer_status: '1',
            transfer_status_message: 'Success',
            transfer_date: '2025-09-04T01:46:03Z',
        },
    });

    const params = {
        headers: {
            Authorization: 'Bearer NGYzMzIxMTJiMDUwNGFjNmFiYmViMzUzOTEwOGVmMGY6MDEwNTU2NTA3MTk0MQ==',
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);

    //console.log('Response body:', response.body);

    return response;
}