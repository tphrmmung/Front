
import generatePayload from 'promptpay-qr'
import QRcode from 'react-qr-code';

export default function QRCodeGenerate({ price }) {

    const result = generatePayload('0986201506', { amount: price })

    return (
        <div className='pb-10 flex justify-center'>
            <div className='pb-1 w-[26rem] rounded-3xl border-2 shadow-lg select-none pointer-events-none scale-90'>
                <div className='bg-[#1a3763] w-full h-14 relative rounded-t-3xl flex justify-center items-center'>
                    <img className='max-w-32' src="https://thaidatacloud-www.s3.ap-southeast-1.amazonaws.com/www.tdc.thaidata.cloud/banks/icon-qr-promptpay.svg" alt="" />
                </div>
                <div className='flex justify-center items-center my-2'>
                    <img className='max-h-14' src="https://upload.wikimedia.org/wikipedia/commons/c/c5/PromptPay-logo.png" alt="" />
                </div>
                <div className='relative'>
                    <QRcode value={result} size={230}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="L"
                        title="Scan me!"
                        className='mx-auto'
                    />
                    <img
                        src="https://www.jib.co.th/web/images/qrcode/Thai_QR_Payment.png"
                        alt="logo"
                        className="absolute max-w-5 top-[51%] left-[51%] transform -translate-x-1/2 -translate-y-1/2 object-cover"
                    />
                </div>
                <div className='font-sf-pro-th font-bold mt-3 mb-2 text-xl text-center'>
                    <p>น.ส ธารทิพย์ พรมมุงคุณ</p>
                </div>
            </div>
        </div>
    )
}
