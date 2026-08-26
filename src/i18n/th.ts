const th = {
  translation: {
    bottomTab: {
      home: 'หน้าหลัก',
      wallet: 'กระเป๋าเงิน',
      qr: 'QR',
      history: 'ประวัติ',
      profile: 'โปรไฟล์',
    },
    common: {
      back: 'ย้อนกลับ',
      save: 'บันทึก',
      cancel: 'ยกเลิก',
      confirm: 'ยืนยัน',
      loading: 'กำลังโหลด...',
      currency: '฿',
      continue: 'ดำเนินการต่อ',
      success: 'สำเร็จ',
      error: 'เกิดข้อผิดพลาด',
    },
    register: {
      title: 'สร้างบัญชีผู้ใช้',
      subtitle: 'สมัครสมาชิกเพื่อเริ่มชาร์จกับ GSB EV',
      emailTitle: 'กรอกอีเมลของคุณ',
      emailSubtitle: 'เราจะตรวจสอบว่าอีเมลนี้สามารถใช้สมัครได้หรือไม่',
      email: 'อีเมล',
      checkEmail: 'ดำเนินการต่อ',
      changeEmail: 'เปลี่ยนอีเมล',
      detailsTitle: 'กรอกรายละเอียดของคุณ',
      firstName: 'ชื่อ',
      lastName: 'นามสกุล',
      phoneNumber: 'เบอร์โทรศัพท์',
      password: 'รหัสผ่าน',
      confirmPassword: 'ยืนยันรหัสผ่าน',
      termsPrefix: 'ฉันยอมรับ',
      termsLink: 'ข้อกำหนดในการใช้บริการ',
      createAccount: 'สร้างบัญชี',
      google: 'ดำเนินการต่อด้วย Google',
      alreadyHaveAccount: 'มีบัญชีอยู่แล้ว?',
      login: 'เข้าสู่ระบบ',
      emailRequired: 'กรุณากรอกอีเมล',
      emailInvalid: 'กรุณากรอกอีเมลให้ถูกต้อง',
      emailExists: 'อีเมลนี้สมัครไว้แล้ว กรุณาเข้าสู่ระบบ',
      emailCheckFailed: 'ไม่สามารถตรวจสอบอีเมลได้ กรุณาลองใหม่',
      detailsRequired: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน',
      passwordLength: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร',
      passwordMismatch: 'รหัสผ่านไม่ตรงกัน',
      termsRequired: 'กรุณายอมรับข้อกำหนดในการใช้บริการ',
      registerFailed: 'ไม่สามารถสร้างบัญชีได้ กรุณาลองใหม่',
    },

    selectBank: {
      title: 'เลือกธนาคาร',
      topUpAmount: 'จำนวนเงินที่ต้องการเติม',
      selectYourBank: 'เลือกธนาคารของคุณ',
    },

    paymentMethod: {
      title: 'วิธีการชำระเงิน',
      topUpAmount: 'จำนวนเงินที่ต้องการเติม',
      choosePaymentMethod: 'เลือกวิธีการชำระเงิน',

      bankTransfer: 'โอนผ่านธนาคาร',
      bankTransferSubtitle: 'เลือกธนาคารและชำระเงินผ่าน QR',

      mobileBanking: 'โมบายแบงก์กิ้ง',
      mobileBankingSubtitle: 'สแกน QR จากแอปธนาคารของคุณ',

      creditCard: 'บัตรเครดิต',
      creditCardSubtitle: 'Visa / Mastercard',
    },

    paymentProcessing: {
      title: 'กำลังดำเนินการชำระเงิน',
      subtitle: 'กรุณารอสักครู่ ระบบกำลังตรวจสอบการชำระเงินของคุณ',
    },

    topUp: {
      title: 'เติมเงินเข้ากระเป๋าเงิน',
      selectAmount: 'เลือกจำนวนเงิน',
      customAmount: 'จำนวนเงินที่ต้องการเติม',
      enterAmount: 'กรอกจำนวนเงิน',
    },

    qrPayment: {
      title: 'ชำระเงินด้วย QR',
      paymentBank: 'ธนาคารที่ชำระเงิน',
      amount: 'จำนวนเงิน',
      scanQrToPay: 'สแกน QR เพื่อชำระเงิน',
      iHavePaid: 'ฉันชำระเงินแล้ว',
    },

    history: {
      title: 'ประวัติการชาร์จ',
      searchPlaceholder: 'ค้นหาประวัติการชาร์จ...',
    },

    taxInvoice: {
      title: 'ใบกำกับภาษี',
      description: 'ขอใบกำกับภาษีอิเล็กทรอนิกส์สำหรับรายการชาร์จรถยนต์ไฟฟ้า',

      chargingInformation: 'ข้อมูลการชาร์จ',
      receiptNo: 'เลขที่ใบเสร็จ:',
      auto: 'อัตโนมัติ',
      energy: 'พลังงานที่ใช้',
      duration: 'ระยะเวลา',
      totalPaid: 'ยอดชำระทั้งหมด',

      taxpayerInformation: 'ข้อมูลผู้เสียภาษี',
      companyName: 'ชื่อบริษัท / ชื่อผู้เสียภาษี',
      taxId: 'เลขประจำตัวผู้เสียภาษี',

      addressInformation: 'ข้อมูลที่อยู่',
      address: 'ที่อยู่',
      province: 'จังหวัด',
      district: 'อำเภอ / เขต',
      subdistrict: 'ตำบล / แขวง',
      postalCode: 'รหัสไปรษณีย์',

      contactInformation: 'ข้อมูลติดต่อ',
      phoneNumber: 'เบอร์โทรศัพท์',
      emailAddress: 'อีเมล',

      informationSecurity: 'การรักษาความปลอดภัยของข้อมูล',
      securityDescription:
        'ข้อมูลของคุณจะถูกใช้เฉพาะสำหรับการออกใบกำกับภาษีอิเล็กทรอนิกส์เท่านั้น',

      submitRequest: 'ส่งคำขอ',

      incompleteInformation: 'ข้อมูลไม่ครบถ้วน',
      completeAllInformation: 'กรุณากรอกข้อมูลให้ครบถ้วน',

      success: 'สำเร็จ',
      requestSubmitted: 'ส่งคำขอใบกำกับภาษีเรียบร้อยแล้ว',
    },

    taxInvoiceForm: {
      title: 'ใบกำกับภาษี',

      description: 'กรอกข้อมูลสำหรับออกใบกำกับภาษีอิเล็กทรอนิกส์',

      taxpayerInformation: 'ข้อมูลผู้เสียภาษี',

      companyName: 'ชื่อบริษัท / ชื่อผู้เสียภาษี',

      taxId: 'เลขประจำตัวผู้เสียภาษี',

      addressInformation: 'ข้อมูลที่อยู่',

      address: 'ที่อยู่',

      province: 'จังหวัด',

      district: 'อำเภอ / เขต',

      subdistrict: 'ตำบล / แขวง',

      postalCode: 'รหัสไปรษณีย์',

      contactInformation: 'ข้อมูลติดต่อ',

      phoneNumber: 'เบอร์โทรศัพท์',

      emailAddress: 'อีเมล',

      confidentialTitle: 'ข้อมูลของคุณจะถูกเก็บเป็นความลับ',

      confidentialDescription:
        'ข้อมูลนี้จะถูกใช้สำหรับออกใบกำกับภาษีอิเล็กทรอนิกส์เท่านั้น',

      submitRequest: 'ส่งคำขอ',

      incompleteInformation: 'ข้อมูลไม่ครบถ้วน',

      fillRequiredFields: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน',

      success: 'สำเร็จ',

      requestSubmitted: 'ส่งคำขอใบกำกับภาษีเรียบร้อยแล้ว',
    },

    chargingHistoryDetail: {
      title: 'ใบเสร็จการชาร์จ',
      noData: 'ไม่พบข้อมูล',
      historyNotFound: 'ไม่พบประวัติการชาร์จ',

      receiptNo: 'เลขที่ใบเสร็จ',

      chargingInformation: 'ข้อมูลการชาร์จ',
      charger: 'เครื่องชาร์จ',
      connector: 'หัวชาร์จ',
      energy: 'พลังงาน',
      duration: 'ระยะเวลา',

      paymentSummary: 'สรุปการชำระเงิน',
      chargingFee: 'ค่าชาร์จ',
      serviceFee: 'ค่าบริการ',
      vat: 'ภาษีมูลค่าเพิ่ม',
      included: 'รวมแล้ว',
      totalPaid: 'ยอดชำระทั้งหมด',

      saveReceipt: 'บันทึกใบเสร็จ',
      saveReceiptSubtitle: 'บันทึกสำเนาไว้ในอุปกรณ์ของคุณ',

      requestTaxInvoice: 'ขอใบกำกับภาษี',

      receiptSaved: 'บันทึกใบเสร็จลงในอุปกรณ์เรียบร้อยแล้ว',
      receiptSaveError: 'ไม่สามารถบันทึกใบเสร็จได้',
    },

    profile: {
      title: 'โปรไฟล์',
      myAccount: 'บัญชีของฉัน',
      availableBalance: 'ยอดคงเหลือ',
      couponCard: 'คูปองและบัตร',
      myCar: 'รถของฉัน',
      totalKwh: 'พลังงานทั้งหมด',
      reduceCo2: 'ลด CO₂',
      favorite: 'รายการโปรด',
      reservation: 'การจอง',
      language: 'ภาษา',
      service: 'บริการ',
      creditPayment: 'การชำระเงินด้วยบัตร',
      promotionCoupons: 'โปรโมชั่น / คูปอง',
      chargingStations: 'สถานีชาร์จ',
      switchCountry: 'เปลี่ยนประเทศ',
      about: 'เกี่ยวกับ',
      logout: 'ออกจากระบบ',
    },

    personalInformation: {
      title: 'ข้อมูลส่วนตัว',

      subtitle: 'จัดการข้อมูลส่วนตัวของบัญชีของคุณ',

      user: 'ผู้ใช้',

      noEmail: 'ไม่มีอีเมล',

      personalInformation: 'ข้อมูลส่วนตัว',

      firstName: 'ชื่อ',

      lastName: 'นามสกุล',

      emailAddress: 'อีเมล',

      phoneNumber: 'หมายเลขโทรศัพท์',

      securityTitle: 'ข้อมูลของคุณได้รับการรักษาความปลอดภัย',

      securityDescription:
        'ข้อมูลส่วนตัวของคุณจะถูกจัดเก็บอย่างปลอดภัยและใช้สำหรับบัญชีของคุณเท่านั้น',

      saveChanges: 'บันทึกการเปลี่ยนแปลง',

      incompleteInformation: 'ข้อมูลไม่ครบถ้วน',

      enterName: 'กรุณากรอกชื่อ-นามสกุล',

      enterEmail: 'กรุณากรอกอีเมล',

      enterPhone: 'กรุณากรอกหมายเลขโทรศัพท์',

      cannotSelectImage: 'ไม่สามารถเลือกรูปภาพได้',

      updated: 'อัปเดตข้อมูลส่วนตัวเรียบร้อยแล้ว',
    },

    home: {
      nearbyStations: 'สถานีชาร์จใกล้เคียง',
      chargingStations: 'สถานีชาร์จ',
      searchChargingStation: 'ค้นหาสถานีชาร์จ...',
      all: 'ทั้งหมด',
      available: 'พร้อมใช้งาน',
      showList: 'แสดงรายการ',
    },

    station: {
      chargingStation: 'สถานีชาร์จ',
      open24Hours: 'เปิด 24 ชั่วโมง',
      price: 'ราคา',
      detail: 'รายละเอียด',
      allChargers: 'หัวชาร์จทั้งหมด',
      available: 'พร้อมใช้งาน',
      unavailable: 'ไม่พร้อมใช้งาน',
      delayFreeTime: 'ไม่มีค่าธรรมเนียมการรอ',
      startCharging: 'เริ่มชาร์จ',
      goHere: 'ไปที่นี่',
      promotion: 'ชาร์จเร็วขึ้น ประสบการณ์ที่ดียิ่งขึ้น',
      fasterCharging: 'ชาร์จเร็วขึ้น ประสบการณ์ที่ดียิ่งขึ้น',
      getDirections: 'นำทาง',
    },

    readyToCharge: {
      title: 'พร้อมชาร์จ',
      noChargerSelected: 'ยังไม่ได้เลือกเครื่องชาร์จ',

      addMyCar: 'เพิ่มรถของฉัน',

      paymentSetting: 'การตั้งค่าการชำระเงิน',
      balancePayment: 'ชำระเงินด้วยยอดคงเหลือ',
      topUp: 'เติมเงิน',
      insufficientBalanceTip:
        'หมายเหตุ: หากยอดคงเหลือไม่เพียงพอ ระบบจะหยุดการชาร์จโดยอัตโนมัติ',

      creditPayment: 'ชำระเงินด้วยบัตรเครดิต',
      addCreditCard: '+ เพิ่มบัตรเครดิต',

      discount: 'ส่วนลด',
      prepaidCard: 'บัตรเติมเงิน',
      noCards: 'ไม่มีบัตร',
      couponDiscountCard: 'คูปอง / บัตรส่วนลด',
      noCoupons: 'ไม่มีคูปอง',

      chargingStrategy: 'รูปแบบการชาร์จ',
      maxSoc: 'ระดับแบตเตอรี่สูงสุด',

      plugConnectorWarning: 'กรุณาเสียบหัวชาร์จเข้ากับรถของคุณ!',
      startCharging: 'เริ่มชาร์จ',
      connector: 'หัวชาร์จ',
    },

    qrScanner: {
      title: 'สแกน QR',
      invalidChargingInformation: 'ข้อมูลการชาร์จไม่ถูกต้อง',

      requestingCameraPermission: 'กำลังขอสิทธิ์ใช้กล้อง',
      allowCameraAccess: 'กรุณาอนุญาตให้เข้าถึงกล้องเพื่อสแกน QR Code',

      cameraPermissionRequired: 'จำเป็นต้องอนุญาตใช้กล้อง',
      allowCameraAccessToUseScanner:
        'กรุณาอนุญาตให้เข้าถึงกล้องเพื่อใช้งานเครื่องสแกน QR',
      allowCamera: 'อนุญาตใช้กล้อง',

      cameraNotAvailable: 'ไม่สามารถใช้งานกล้องได้',
      unableToAccessCamera: 'ไม่สามารถเข้าถึงกล้องของอุปกรณ์ได้',

      scanChargerQr: 'สแกน QR Code ของเครื่องชาร์จ',
      positionQrCode: 'วาง QR Code ให้อยู่ภายในกรอบ',

      chargingInformation: 'ข้อมูลการชาร์จ',
      station: 'สถานี',
      charger: 'เครื่องชาร์จ',
      connector: 'หัวชาร์จ',

      confirmStartCharging: 'ยืนยันเริ่มชาร์จ',
    },

    charging: {
      charging: 'กำลังชาร์จ',
      preparing: 'กำลังเตรียมการ',
      finishing: 'กำลังสิ้นสุดการชาร์จ',
      completed: 'ชาร์จเสร็จสิ้น',

      maxOutput: 'กำลังจ่ายสูงสุด',
      liveCharging: 'กำลังชาร์จ',

      energy: 'พลังงาน',
      duration: 'ระยะเวลา',
      cost: 'ค่าใช้จ่าย',
      power: 'กำลังไฟ',

      stopCharging: 'หยุดการชาร์จ',

      stopChargingTitle: 'หยุดการชาร์จ',
      stopChargingConfirmation: 'คุณแน่ใจหรือไม่ว่าต้องการหยุดการชาร์จ?',
      cancel: 'ยกเลิก',
      stop: 'หยุด',
    },

    chargingSummary: {
      title: 'สรุปการชาร์จ',
      chargingCompleted: 'ชาร์จเสร็จสิ้น',

      station: 'สถานี',
      charger: 'เครื่องชาร์จ',
      connector: 'หัวชาร์จ',

      duration: 'ระยะเวลาชาร์จ',
      energyUsed: 'พลังงานที่ใช้',
      power: 'กำลังไฟ',
      chargingCost: 'ค่าชาร์จ',
      serviceFee: 'ค่าบริการ',
      vat: 'VAT 7%',
      total: 'รวมทั้งหมด',
      pricePerKwh: 'ราคาชาร์จต่อ kWh',

      proceedPayment: 'ดำเนินการชำระเงิน',
    },

    payment: {
      title: 'ชำระเงิน',

      paymentRequired: 'ต้องชำระเงิน',
      reviewPayment: 'ตรวจสอบข้อมูลการชำระเงินก่อนยืนยัน',

      chargingAmount: 'ค่าชาร์จ',

      coupon: 'คูปอง',
      selectCoupon: 'เลือกคูปอง',
      couponsAvailable: 'คูปองที่ใช้ได้',
      removeCoupon: 'ลบคูปอง',

      noCoupons: 'ไม่มีคูปอง',
      noAvailableCoupons: 'คุณไม่มีคูปองที่สามารถใช้งานได้',

      originalAmount: 'ยอดเงินก่อนส่วนลด',
      couponDiscount: 'ส่วนลดคูปอง',
      totalPayment: 'ยอดชำระทั้งหมด',

      selectPaymentMethod: 'เลือกวิธีการชำระเงิน',

      wallet: 'กระเป๋าเงิน',
      balance: 'ยอดคงเหลือ',
      creditCard: 'บัตรเครดิต',
      paySecurelyWithCard: 'ชำระเงินอย่างปลอดภัยด้วยบัตร',

      info: 'คูปองจะถูกเปลี่ยนสถานะเป็นใช้งานแล้วหลังจากการชำระเงินสำเร็จเท่านั้น.',

      confirmPayment: 'ยืนยันการชำระเงิน',

      paymentMethodRequired: 'กรุณาเลือกวิธีการชำระเงิน',
      selectPaymentMethodMessage: 'กรุณาเลือกวิธีการชำระเงิน',

      paymentFailed: 'การชำระเงินไม่สำเร็จ',
      insufficientWalletBalance: 'ยอดเงินในกระเป๋าเงินไม่เพียงพอ',

      couponError: 'เกิดข้อผิดพลาดเกี่ยวกับคูปอง',
      couponCouldNotBeUsed: 'ไม่สามารถใช้คูปองที่เลือกได้',

      selectCouponTitle: 'เลือกคูปอง',
      selectCouponSubtitle: 'เลือกคูปองที่สามารถใช้งานได้',

      code: 'รหัส',
      expires: 'หมดอายุ',
      noCouponsAvailable: 'ไม่มีคูปองที่สามารถใช้งานได้',

      collectPromotion: 'รับโปรโมชั่นก่อนเพื่อใช้คูปองในการชำระเงิน',
      creditCardNotAvailable:
        'การชำระด้วยบัตรเครดิตยังไม่พร้อมให้บริการในขณะนี้',
    },

    receipt: {
      title: 'ใบเสร็จ',
      paymentSuccessful: 'ชำระเงินสำเร็จ',
      chargingPaymentCompleted: 'การชำระค่าชาร์จของคุณเสร็จสมบูรณ์แล้ว',

      chargingInformation: 'ข้อมูลการชาร์จ',
      station: 'สถานี',
      charger: 'เครื่องชาร์จ',
      connector: 'หัวชาร์จ',
      energy: 'พลังงาน',
      chargingDuration: 'ระยะเวลาการชาร์จ',
      endTime: 'เวลาสิ้นสุด',

      paymentSummary: 'สรุปการชำระเงิน',
      chargingAmount: 'ค่าชาร์จ',
      couponDiscount: 'ส่วนลดคูปอง',
      totalPayment: 'ยอดชำระทั้งหมด',

      paymentInformation: 'ข้อมูลการชำระเงิน',
      paymentMethod: 'วิธีการชำระเงิน',
      transactionId: 'รหัสธุรกรรม',
      paidAt: 'ชำระเมื่อ',

      saveReceipt: 'บันทึกใบเสร็จ',
      saveReceiptDescription: 'บันทึกสำเนาใบเสร็จลงในอุปกรณ์',

      requestTaxInvoice: 'ขอใบกำกับภาษี',
      taxInvoiceDescription: 'ขอใบกำกับภาษีอย่างเป็นทางการ',

      backToHome: 'กลับหน้าหลัก',
    },

    wallet: {
      walletBalance: 'ยอดเงิน Wallet',
      updated: 'อัปเดต',
      viewAll: 'ดูทั้งหมด',
    },

    language: {
      title: 'ภาษา',
      selectLanguage: 'เลือกภาษา',
      thai: 'ไทย',
      english: 'English',
      chinese: '中文',
    },

    service: {
      title: 'บริการ',
      feedback: 'ความคิดเห็น',
      onlineService: 'บริการออนไลน์',
      howCanWeHelp: 'เราสามารถช่วยคุณได้อย่างไร?',
      description:
        'เลือกบริการด้านล่างเพื่อส่งความคิดเห็นหรือขอความช่วยเหลือจากทีมสนับสนุนของเรา',
      feedbackDescription: 'แบ่งปันประสบการณ์ของคุณและช่วยให้เราปรับปรุงบริการ',
      online: 'ออนไลน์',
      onlineServiceDescription: 'ติดต่อทีมสนับสนุนของเราเพื่อขอความช่วยเหลือ',
      needHelp: 'ต้องการความช่วยเหลือ?',
      supportDescription:
        'ทีมสนับสนุนของเราพร้อมให้ความช่วยเหลือเกี่ยวกับการชาร์จ การชำระเงิน บัญชีผู้ใช้ และปัญหาการใช้งานแอปพลิเคชัน',
    },

    feedback: {
      title: 'ความคิดเห็น',

      howWasYourExperience: 'ประสบการณ์ของคุณเป็นอย่างไรบ้าง?',

      introduction:
        'ความคิดเห็นของคุณช่วยให้เราปรับปรุงประสบการณ์การใช้งาน GSB EV ให้ดียิ่งขึ้น',

      rateYourExperience: 'ให้คะแนนประสบการณ์ของคุณ',

      tapStarToRate: 'แตะดาวเพื่อให้คะแนนประสบการณ์ของคุณ',

      noRatingSelected: 'ยังไม่ได้เลือกคะแนน',

      veryDissatisfied: 'ไม่พอใจอย่างมาก',

      dissatisfied: 'ไม่พอใจ',

      neutral: 'ปานกลาง',

      satisfied: 'พอใจ',

      verySatisfied: 'พอใจมาก',

      feedbackAbout: 'คุณต้องการแสดงความคิดเห็นเกี่ยวกับเรื่องใด?',

      application: 'แอปพลิเคชัน',

      charging: 'การชาร์จ',

      payment: 'การชำระเงิน',

      service: 'บริการ',

      other: 'อื่น ๆ',

      tellUsMore: 'บอกเราเพิ่มเติม',

      commentsDescription: 'โปรดแบ่งปันความคิดเห็นหรือข้อเสนอแนะของคุณ',

      placeholder: 'เขียนความคิดเห็นของคุณที่นี่...',

      submitFeedback: 'ส่งความคิดเห็น',

      thankYou: 'ขอบคุณที่ช่วยให้เราปรับปรุงบริการของเราให้ดียิ่งขึ้น',
    },

    onlineService: {
      title: 'บริการออนไลน์',

      howCanWeHelp: 'เราสามารถช่วยคุณได้อย่างไร?',

      description:
        'ติดต่อทีมบริการลูกค้าของเราผ่านช่องทางใดช่องทางหนึ่งด้านล่าง',

      onlineSupport: 'บริการช่วยเหลือออนไลน์',

      line: 'LINE',

      lineDescription: 'แชทกับทีมบริการลูกค้าของเรา',

      facebook: 'Facebook',

      facebookDescription: 'ติดตามเราหรือส่งข้อความหาเรา',

      callCenter: 'ศูนย์บริการลูกค้า',

      customerSupport: 'ฝ่ายบริการลูกค้า',

      supportDescription:
        'ทีมบริการลูกค้าของเราสามารถช่วยเหลือคุณเกี่ยวกับการชาร์จ การชำระเงิน บัญชีผู้ใช้ และปัญหาเกี่ยวกับแอปพลิเคชัน',

      cannotOpen: 'ไม่สามารถเปิดได้',

      cannotOpenService: 'ไม่สามารถเปิดช่องทางบริการนี้ได้',

      error: 'เกิดข้อผิดพลาด',

      cannotOpenServiceChannel: 'ไม่สามารถเปิดช่องทางบริการได้',

      cannotCall: 'ไม่สามารถโทรได้',

      deviceCannotCall: 'อุปกรณ์นี้ไม่รองรับการโทรออก',
    },

    creditPayment: {
      title: 'บัตรเครดิต',
      subtitle: 'จัดการบัตรสำหรับการชำระเงิน',

      paymentMethods: 'ช่องทางการชำระเงิน',
      savedCreditCards: 'บัตรเครดิตที่บันทึกไว้',

      noCreditCard: 'ยังไม่มีบัตรเครดิต',
      noCreditCardDescription:
        'เพิ่มบัตรเครดิตเพื่อให้การชำระเงินค่าชาร์จของคุณรวดเร็วและสะดวกยิ่งขึ้น',
      addCreditCard: 'เพิ่มบัตรเครดิต',

      default: 'ค่าเริ่มต้น',
      cardHolder: 'ชื่อผู้ถือบัตร',

      defaultCard: 'บัตรเริ่มต้น',
      defaultCardMessage: 'บัตรนี้เป็นวิธีการชำระเงินเริ่มต้นของคุณอยู่แล้ว',

      removeCreditCard: 'ลบบัตรเครดิต',
      removeCreditCardMessage: 'คุณแน่ใจหรือไม่ว่าต้องการลบบัตรใบนี้?',
      cancel: 'ยกเลิก',
      remove: 'ลบ',

      addAnotherCreditCard: 'เพิ่มบัตรเครดิตอีกใบ',
      addAnotherCreditCardDescription: 'เพิ่มบัตรอีกใบสำหรับการชำระเงิน',

      securityTitle: 'ข้อมูลการชำระเงินของคุณปลอดภัย',
      securityDescription:
        'ข้อมูลบัตรของคุณได้รับการปกป้องอย่างปลอดภัยและใช้เฉพาะสำหรับการดำเนินการชำระเงินเท่านั้น',

      error: 'เกิดข้อผิดพลาด',
      cannotRemoveCard: 'ไม่สามารถลบบัตรเครดิตได้',
    },

    addCreditCard: {
      title: 'เพิ่มบัตรเครดิต',
      subtitle: 'เพิ่มบัตรสำหรับชำระค่าบริการชาร์จ',

      cardBrand: 'บัตรเครดิต',
      cardholder: 'ผู้ถือบัตร',
      yourName: 'ชื่อของคุณ',
      expires: 'หมดอายุ',

      cardInformation: 'ข้อมูลบัตร',

      cardholderName: 'ชื่อผู้ถือบัตร',
      cardholderNamePlaceholder: 'กรอกชื่อผู้ถือบัตร',

      cardNumber: 'หมายเลขบัตร',
      cardNumberPlaceholder: '1234 5678 9012 3456',

      expiryDate: 'วันหมดอายุ',
      expiryDatePlaceholder: 'ดด/ปป',

      cvv: 'CVV',
      cvvPlaceholder: '123',

      securityTitle: 'ข้อมูลการชำระเงินของคุณปลอดภัย',
      securityDescription:
        'ข้อมูลบัตรของคุณได้รับการปกป้องอย่างปลอดภัยและใช้เฉพาะสำหรับการดำเนินการชำระเงินเท่านั้น',

      addButton: 'เพิ่มบัตรเครดิต',

      incompleteInformation: 'ข้อมูลไม่ครบถ้วน',
      enterCardholderName: 'กรุณากรอกชื่อผู้ถือบัตร',
      enterCardNumber: 'กรุณากรอกหมายเลขบัตร',
      enterExpiryDate: 'กรุณากรอกวันหมดอายุ',
      enterCvv: 'กรุณากรอก CVV',

      success: 'สำเร็จ',
      successMessage: 'เพิ่มบัตรเครดิตเรียบร้อยแล้ว',
      ok: 'ตกลง',
    },

    about: {
      title: 'เกี่ยวกับ',

      appDescription: 'แอปพลิเคชันสำหรับชาร์จรถยนต์ไฟฟ้า',

      version: 'เวอร์ชัน',

      information: 'ข้อมูล',

      aboutApplication: 'เกี่ยวกับแอปพลิเคชัน',
      aboutApplicationDescription: 'ข้อมูลเกี่ยวกับ GSB EV',

      terms: 'ข้อกำหนดและเงื่อนไข',
      termsDescription: 'ข้อกำหนดในการใช้งานและการให้บริการ',

      privacyPolicy: 'นโยบายความเป็นส่วนตัว',
      privacyPolicyDescription: 'วิธีที่เราปกป้องข้อมูลของคุณ',

      contactUs: 'ติดต่อเรา',
      contactUsDescription: 'ขอความช่วยเหลือและติดต่อฝ่ายบริการ',

      poweredBy: 'พัฒนาโดย',

      copyright: '© 2026 GSB Sunpower สงวนลิขสิทธิ์',

      footer: 'ประสบการณ์การชาร์จรถยนต์ไฟฟ้าที่สะดวกและชาญฉลาดยิ่งขึ้น',
    },

    promotion: {
      title: 'โปรโมชั่น',
      subtitle: 'ค้นหาและเก็บคูปองสิทธิพิเศษ',

      myCoupons: 'คูปองของฉัน',
      couponsAvailable: 'คูปองที่ใช้ได้',
      view: 'ดู',

      explorePromotions: 'โปรโมชั่นที่น่าสนใจ',

      categories: {
        all: 'ทั้งหมด',
        evCharging: 'ชาร์จรถยนต์ไฟฟ้า',
        hotel: 'โรงแรม',
        restaurant: 'ร้านอาหาร',
        travel: 'ท่องเที่ยว',
        lifestyle: 'ไลฟ์สไตล์',
      },

      alreadyCollected: 'เก็บคูปองแล้ว',
      alreadyCollectedMessage: 'คูปองนี้ถูกเพิ่มไว้ในคูปองของฉันแล้ว',

      couponCollected: 'เก็บคูปองสำเร็จ',
      couponCollectedMessage: 'เพิ่มคูปองไปยังคูปองของฉันเรียบร้อยแล้ว',

      expires: 'หมดอายุ',

      collected: 'เก็บแล้ว',
      collect: 'เก็บคูปอง',

      info: 'เก็บคูปองไว้ล่วงหน้า และนำไปใช้ในขั้นตอนการชำระเงินเมื่อชาร์จรถยนต์ไฟฟ้า',
    },

    promotionDetail: {
      title: 'รายละเอียดโปรโมชั่น',

      couponCode: 'รหัสคูปอง',
      useCodeDuringPayment: 'ใช้รหัสนี้ในระหว่างการชำระเงิน',
      code: 'รหัส',
      copy: 'คัดลอก',

      validity: 'ระยะเวลาการใช้งาน',
      validUntil: 'ใช้ได้ถึง',

      termsConditions: 'ข้อกำหนดและเงื่อนไข',

      termParticipatingLocations:
        'สามารถใช้ได้เฉพาะสถานที่ที่เข้าร่วมรายการเท่านั้น',

      termOnePerAccount: 'สามารถใช้คูปองได้หนึ่งใบต่อหนึ่งบัญชี',

      termCannotCombine: 'ไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นได้',

      termValidPayment: 'คูปองต้องยังไม่หมดอายุในขณะที่ชำระเงิน',

      notice:
        'หลังจากเก็บคูปองแล้ว คุณสามารถเลือกใช้คูปองได้ในขั้นตอนการชำระเงินเมื่อชาร์จรถ EV',

      collectCoupon: 'เก็บคูปอง',
      couponCollected: 'เก็บคูปองแล้ว',

      alreadyCollected: 'เก็บคูปองแล้ว',
      alreadyCollectedMessage: 'คูปองนี้อยู่ในคูปองของฉันแล้ว',

      couponAddedMessage: 'เพิ่มคูปองนี้ไปยังคูปองของฉันเรียบร้อยแล้ว',

      notFound: 'ไม่พบโปรโมชั่น',
      goBack: 'ย้อนกลับ',

      ok: 'ตกลง',
    },

    myCoupons: {
      title: 'คูปองของฉัน',

      subtitle: 'ส่วนลดและสิทธิประโยชน์ที่คุณเก็บไว้',

      couponWallet: 'กระเป๋าคูปอง',

      couponsAvailable: 'มีคูปองที่ใช้ได้ {{count}} ใบ',

      tabs: {
        available: 'ใช้ได้',
        used: 'ใช้แล้ว',
        expired: 'หมดอายุ',
      },

      noCoupons: 'ไม่มีคูปอง',

      emptyMessages: {
        available: 'คุณยังไม่มีคูปองที่สามารถใช้งานได้',
        used: 'คุณยังไม่มีคูปองที่ใช้ไปแล้ว',
        expired: 'คุณยังไม่มีคูปองที่หมดอายุ',
      },

      explorePromotions: 'ดูโปรโมชั่น',

      code: 'รหัส',

      expires: 'หมดอายุ {{date}}',

      status: {
        used: 'ใช้แล้ว',
        expired: 'หมดอายุ',
      },

      info: 'คุณสามารถเลือกคูปองที่ใช้ได้ในขั้นตอนการชำระเงินเมื่อชาร์จรถ EV',
    },
  },
};

export default th;
