const zh = {
  translation: {
    common: {
      back: '返回',
      save: '保存',
      cancel: '取消',
      confirm: '确认',
      loading: '加载中...',
      currency: '฿',
      continue: '继续',
      success: '成功',
      error: '发生错误',
    },
    selectBank: {
      title: '选择银行',
      topUpAmount: '充值金额',
      selectYourBank: '选择您的银行',
    },

    paymentMethod: {
      title: '支付方式',
      topUpAmount: '充值金额',
      choosePaymentMethod: '选择支付方式',

      bankTransfer: '银行转账',
      bankTransferSubtitle: '选择银行并通过二维码支付',

      mobileBanking: '手机银行',
      mobileBankingSubtitle: '使用您的银行应用扫描二维码',

      creditCard: '信用卡',
      creditCardSubtitle: 'Visa / Mastercard',
    },

    paymentProcessing: {
      title: '正在处理付款',
      subtitle: '请稍候，系统正在验证您的付款',
    },

    topUp: {
      title: '充值钱包',
      selectAmount: '选择金额',
      customAmount: '自定义金额',
      enterAmount: '请输入金额',
    },

    qrPayment: {
      title: '二维码支付',
      paymentBank: '支付银行',
      amount: '金额',
      scanQrToPay: '扫描二维码支付',
      iHavePaid: '我已付款',
    },

    history: {
      title: '充电记录',
      searchPlaceholder: '搜索充电记录...',
    },

    taxInvoice: {
      title: '电子发票',
      description: '申请本次充电交易的电子发票',

      chargingInformation: '充电信息',
      receiptNo: '收据编号：',
      auto: '自动生成',
      energy: '充电电量',
      duration: '充电时长',
      totalPaid: '支付总额',

      taxpayerInformation: '纳税人信息',
      companyName: '公司名称 / 纳税人姓名',
      taxId: '纳税人识别号',

      addressInformation: '地址信息',
      address: '地址',
      province: '省',
      district: '区 / 县',
      subdistrict: '街道 / 乡镇',
      postalCode: '邮政编码',

      contactInformation: '联系信息',
      phoneNumber: '电话号码',
      emailAddress: '电子邮箱',

      informationSecurity: '信息安全',
      securityDescription: '您的信息仅用于生成电子发票',

      submitRequest: '提交申请',

      incompleteInformation: '信息不完整',
      completeAllInformation: '请填写完整信息',

      success: '成功',
      requestSubmitted: '电子发票申请已提交',
    },

    taxInvoiceForm: {
      title: '电子发票',

      description: '请输入您的账单信息\n以申请电子税务发票。',

      taxpayerInformation: '纳税人信息',

      companyName: '公司名称',

      taxId: '税号',

      addressInformation: '地址信息',

      address: '地址',

      province: '省 / 府',

      district: '县 / 区',

      subdistrict: '街道 / 分区',

      postalCode: '邮政编码',

      contactInformation: '联系信息',

      phoneNumber: '电话号码',

      emailAddress: '电子邮箱',

      confidentialTitle: '您的信息将受到严格保密',

      confidentialDescription: '此信息仅用于生成电子税务发票。',

      submitRequest: '提交申请',

      incompleteInformation: '信息不完整',

      fillRequiredFields: '请填写所有必填信息。',

      success: '成功',

      requestSubmitted: '您的电子税务发票申请已提交。',
    },

    personalInformation: {
      title: '个人信息',

      subtitle: '管理您的个人账户信息',

      user: '用户',

      noEmail: '暂无邮箱',

      personalInformation: '个人信息',

      fullName: '姓名',

      emailAddress: '电子邮箱',

      phoneNumber: '电话号码',

      securityTitle: '您的信息受到安全保护',

      securityDescription: '您的个人信息将被安全存储，仅用于您的账户使用。',

      saveChanges: '保存更改',

      incompleteInformation: '信息不完整',

      enterName: '请输入您的姓名。',

      enterEmail: '请输入您的电子邮箱。',

      enterPhone: '请输入您的电话号码。',

      cannotSelectImage: '无法选择图片。',

      updated: '您的个人信息已更新。',
    },

    chargingHistoryDetail: {
      title: '充电收据',
      noData: '暂无数据',
      historyNotFound: '未找到充电记录',

      receiptNo: '收据编号',

      chargingInformation: '充电信息',
      charger: '充电桩',
      connector: '充电接口',
      energy: '充电量',
      duration: '充电时长',

      paymentSummary: '付款摘要',
      chargingFee: '充电费用',
      serviceFee: '服务费',
      vat: '增值税',
      included: '已包含',
      totalPaid: '支付总额',

      saveReceipt: '保存收据',
      saveReceiptSubtitle: '将收据副本保存到您的设备',

      requestTaxInvoice: '申请税务发票',

      receiptSaved: '收据已保存到您的设备',
      receiptSaveError: '无法保存收据',
    },

    profile: {
      title: '个人中心',
      myAccount: '我的账户',
      availableBalance: '可用余额',
      couponCard: '优惠券和卡',
      myCar: '我的车辆',
      totalKwh: '总用电量',
      reduceCo2: '减少 CO₂',

      favorite: '收藏',
      reservation: '预约',
      language: '语言',
      service: '服务',

      creditPayment: '信用卡支付',
      promotionCoupons: '优惠 / 优惠券',
      chargingStations: '充电站',
      switchCountry: '切换国家',
      about: '关于',

      logout: '退出登录',
    },

    home: {
      nearbyStations: '附近充电站',
      chargingStations: '充电站',
      searchChargingStation: '搜索充电站...',
      all: '全部',
      available: '可用',
      showList: '显示列表',
    },

    station: {
      chargingStation: '充电站',
      open24Hours: '全天 24 小时开放',
      price: '价格',
      detail: '详情',
      allChargers: '全部充电设备',
      available: '可用',
      unavailable: '不可用',
      delayFreeTime: '免费等待，不收取延迟费用',
      startCharging: '开始充电',
      goHere: '前往这里',
      promotion: '更快充电，更佳体验',
      fasterCharging: '更快充电，更佳体验',
      getDirections: '导航',
    },

    readyToCharge: {
      title: '准备充电',
      noChargerSelected: '尚未选择充电桩',

      addMyCar: '添加我的车辆',

      paymentSetting: '支付设置',
      balancePayment: '余额支付',
      topUp: '充值',
      insufficientBalanceTip: '提示：如果余额不足，充电将自动停止。',

      creditPayment: '信用卡支付',
      addCreditCard: '+ 添加信用卡',

      discount: '优惠',
      prepaidCard: '预付卡',
      noCards: '暂无卡片',
      couponDiscountCard: '优惠券 / 折扣卡',
      noCoupons: '暂无优惠券',

      chargingStrategy: '充电策略',
      maxSoc: '最大 SOC',

      plugConnectorWarning: '请将充电枪插入您的车辆！',
      startCharging: '开始充电',
      connector: '充电接口',
    },

    qrScanner: {
      title: '扫描二维码',
      invalidChargingInformation: '充电信息无效',

      requestingCameraPermission: '正在请求相机权限',
      allowCameraAccess: '请允许访问相机以扫描二维码',

      cameraPermissionRequired: '需要相机权限',
      allowCameraAccessToUseScanner: '请允许访问相机以使用二维码扫描功能',
      allowCamera: '允许使用相机',

      cameraNotAvailable: '相机不可用',
      unableToAccessCamera: '无法访问设备相机',

      scanChargerQr: '扫描充电桩二维码',
      positionQrCode: '请将二维码放入框内',

      chargingInformation: '充电信息',
      station: '充电站',
      charger: '充电桩',
      connector: '充电接口',

      confirmStartCharging: '确认开始充电',
    },

    charging: {
      charging: '正在充电',
      preparing: '准备中',
      finishing: '即将完成',
      completed: '充电完成',

      maxOutput: '最大输出',
      liveCharging: '正在充电',

      energy: '电量',
      duration: '时长',
      cost: '费用',
      power: '功率',

      stopCharging: '停止充电',

      stopChargingTitle: '停止充电',
      stopChargingConfirmation: '确定要停止充电吗？',
      cancel: '取消',
      stop: '停止',
    },

    chargingSummary: {
      title: '充电摘要',
      chargingCompleted: '充电完成',

      station: '充电站',
      charger: '充电桩',
      connector: '充电枪',

      duration: '充电时长',
      energyUsed: '使用电量',
      power: '功率',
      chargingCost: '充电费用',
      serviceFee: '服务费',
      vat: '增值税 7%',
      total: '总计',

      proceedPayment: '继续支付',
    },

    payment: {
      title: '支付',

      paymentRequired: '需要支付',
      reviewPayment: '请在确认前检查您的支付信息',

      chargingAmount: '充电费用',

      coupon: '优惠券',
      selectCoupon: '选择优惠券',
      couponsAvailable: '张可用优惠券',
      removeCoupon: '移除优惠券',

      noCoupons: '暂无优惠券',
      noAvailableCoupons: '您没有可用的优惠券。',

      originalAmount: '原始金额',
      couponDiscount: '优惠券折扣',
      totalPayment: '支付总额',

      selectPaymentMethod: '选择支付方式',

      wallet: '钱包',
      balance: '余额',
      creditCard: '信用卡',
      paySecurelyWithCard: '使用银行卡安全支付',

      info: '支付成功后，优惠券才会被标记为已使用。',

      confirmPayment: '确认支付',

      paymentMethodRequired: '需要选择支付方式',
      selectPaymentMethodMessage: '请选择支付方式。',

      paymentFailed: '支付失败',
      insufficientWalletBalance: '钱包余额不足。',

      couponError: '优惠券错误',
      couponCouldNotBeUsed: '无法使用所选优惠券。',

      selectCouponTitle: '选择优惠券',
      selectCouponSubtitle: '选择一张可用的优惠券',

      code: '代码',
      expires: '到期',
      noCouponsAvailable: '暂无可用优惠券',

      collectPromotion: '请先领取优惠活动，然后在支付时使用优惠券。',
    },

    receipt: {
      title: '收据',
      paymentSuccessful: '支付成功',
      chargingPaymentCompleted: '您的充电付款已完成。',

      chargingInformation: '充电信息',
      station: '充电站',
      charger: '充电桩',
      connector: '充电接口',
      energy: '充电量',
      chargingDuration: '充电时长',
      endTime: '结束时间',

      paymentSummary: '付款摘要',
      chargingAmount: '充电费用',
      couponDiscount: '优惠券折扣',
      totalPayment: '支付总额',

      paymentInformation: '付款信息',
      paymentMethod: '付款方式',
      transactionId: '交易编号',
      paidAt: '支付时间',

      saveReceipt: '保存收据',
      saveReceiptDescription: '将收据副本保存到您的设备',

      requestTaxInvoice: '申请税务发票',
      taxInvoiceDescription: '获取正式税务发票',

      backToHome: '返回首页',
    },

    wallet: {
      walletBalance: '钱包余额',
      updated: '更新时间',
      viewAll: '查看全部',
    },

    language: {
      title: '语言',
      selectLanguage: '选择语言',
      thai: 'ไทย',
      english: 'English',
      chinese: '中文',
    },

    service: {
      title: '服务',

      howCanWeHelp: '我们可以如何帮助您？',

      description: '请选择以下服务来提交反馈或获取客服团队的帮助。',

      feedback: '意见反馈',

      feedbackDescription: '分享您的使用体验，帮助我们改进服务',

      onlineService: '在线客服',

      online: '在线',

      onlineServiceDescription: '联系我们的客服团队获取帮助',

      needHelp: '需要帮助？',

      supportDescription:
        '我们的客服团队可以为您提供充电、支付、账户以及应用程序相关问题的帮助。',
    },

    feedback: {
      title: '意见反馈',

      howWasYourExperience: '您的使用体验如何？',

      introduction: '您的反馈将帮助我们不断改善 GSB EV 的使用体验。',

      rateYourExperience: '为您的体验评分',

      tapStarToRate: '点击星星为您的体验评分',

      noRatingSelected: '尚未选择评分',

      veryDissatisfied: '非常不满意',

      dissatisfied: '不满意',

      neutral: '一般',

      satisfied: '满意',

      verySatisfied: '非常满意',

      feedbackAbout: '您想对哪方面提供反馈？',

      application: '应用程序',

      charging: '充电',

      payment: '支付',

      service: '服务',

      other: '其他',

      tellUsMore: '告诉我们更多',

      commentsDescription: '请分享您的意见或建议。',

      placeholder: '请在此输入您的反馈...',

      submitFeedback: '提交反馈',

      thankYou: '感谢您帮助我们改进服务。',
    },

    onlineService: {
      title: '在线服务',

      howCanWeHelp: '我们可以如何帮助您？',

      description: '您可以通过以下任一渠道联系我们的客服团队。',

      onlineSupport: '在线客服',

      line: 'LINE',

      lineDescription: '与我们的客服团队在线聊天',

      facebook: 'Facebook',

      facebookDescription: '关注我们或向我们发送消息',

      callCenter: '客服中心',

      customerSupport: '客户服务',

      supportDescription:
        '我们的客服团队可以帮助您处理充电、支付、账户以及应用程序相关问题。',

      cannotOpen: '无法打开',

      cannotOpenService: '无法打开此服务渠道。',

      error: '发生错误',

      cannotOpenServiceChannel: '无法打开服务渠道。',

      cannotCall: '无法拨打电话',

      deviceCannotCall: '此设备不支持拨打电话。',
    },

    creditPayment: {
      title: '信用卡支付',
      subtitle: '管理您的支付卡',

      paymentMethods: '支付方式',
      savedCreditCards: '已保存的信用卡',

      noCreditCard: '尚未添加信用卡',
      noCreditCardDescription: '添加信用卡，让您的充电付款更加快速和便捷。',
      addCreditCard: '添加信用卡',

      default: '默认',
      cardHolder: '持卡人',

      defaultCard: '默认卡',
      defaultCardMessage: '此卡已经是您的默认支付方式。',

      removeCreditCard: '删除信用卡',
      removeCreditCardMessage: '您确定要删除此信用卡吗？',
      cancel: '取消',
      remove: '删除',

      addAnotherCreditCard: '添加另一张信用卡',
      addAnotherCreditCardDescription: '添加另一张信用卡用于支付',

      securityTitle: '您的支付信息是安全的',
      securityDescription: '您的银行卡信息受到安全保护，仅用于支付处理。',

      error: '错误',
      cannotRemoveCard: '无法删除信用卡。',
    },

    addCreditCard: {
      title: '添加信用卡',
      subtitle: '添加用于充电付款的信用卡',

      cardBrand: '信用卡',
      cardholder: '持卡人',
      yourName: '您的姓名',
      expires: '有效期',

      cardInformation: '银行卡信息',

      cardholderName: '持卡人姓名',
      cardholderNamePlaceholder: '请输入持卡人姓名',

      cardNumber: '卡号',
      cardNumberPlaceholder: '1234 5678 9012 3456',

      expiryDate: '有效期',
      expiryDatePlaceholder: '月/年',

      cvv: 'CVV',
      cvvPlaceholder: '123',

      securityTitle: '您的支付信息是安全的',
      securityDescription: '您的银行卡信息受到安全保护，仅用于支付处理。',

      addButton: '添加信用卡',

      incompleteInformation: '信息不完整',
      enterCardholderName: '请输入持卡人姓名。',
      enterCardNumber: '请输入卡号。',
      enterExpiryDate: '请输入有效期。',
      enterCvv: '请输入 CVV。',

      success: '添加成功',
      successMessage: '信用卡已成功添加。',
      ok: '确定',
    },

    about: {
      title: '关于',

      appDescription: '电动汽车充电应用程序',

      version: '版本',

      information: '信息',

      aboutApplication: '关于应用程序',
      aboutApplicationDescription: 'GSB EV 应用程序信息',

      terms: '条款与条件',
      termsDescription: '使用条款和服务条款',

      privacyPolicy: '隐私政策',
      privacyPolicyDescription: '我们如何保护您的信息',

      contactUs: '联系我们',
      contactUsDescription: '获取帮助并联系客户支持',

      poweredBy: '由以下公司提供支持',

      copyright: '© 2026 GSB Sunpower。保留所有权利。',

      footer: '为您带来更智能的电动汽车充电体验',
    },

    promotion: {
      title: '优惠活动',
      subtitle: '发现并领取专属优惠券',

      myCoupons: '我的优惠券',
      couponsAvailable: '张可用优惠券',
      view: '查看',

      explorePromotions: '探索优惠活动',

      categories: {
        all: '全部',
        evCharging: '电动汽车充电',
        hotel: '酒店',
        restaurant: '餐厅',
        travel: '旅游',
        lifestyle: '生活方式',
      },

      alreadyCollected: '已领取',
      alreadyCollectedMessage: '此优惠券已添加到我的优惠券中。',

      couponCollected: '领取成功',
      couponCollectedMessage: '优惠券已添加到我的优惠券中。',

      expires: '有效期至',

      collected: '已领取',
      collect: '领取',

      info: '现在领取优惠券，并在为您的电动汽车充电付款时使用。',
    },

    promotionDetail: {
      title: '优惠详情',

      couponCode: '优惠券代码',
      useCodeDuringPayment: '付款时使用此代码',
      code: '代码',
      copy: '复制',

      validity: '有效期',
      validUntil: '有效至',

      termsConditions: '条款与条件',

      termParticipatingLocations: '仅限参与活动的地点使用。',

      termOnePerAccount: '每个账户限使用一张优惠券。',

      termCannotCombine: '不可与其他优惠同时使用。',

      termValidPayment: '付款时优惠券必须仍在有效期内。',

      notice: '领取优惠券后，您可以在为电动车充电付款时选择使用该优惠券。',

      collectCoupon: '领取优惠券',
      couponCollected: '已领取优惠券',

      alreadyCollected: '已领取',
      alreadyCollectedMessage: '此优惠券已经添加到我的优惠券中。',

      couponAddedMessage: '此优惠券已成功添加到我的优惠券。',

      notFound: '未找到优惠活动',
      goBack: '返回',

      ok: '确定',
    },

    myCoupons: {
      title: '我的优惠券',

      subtitle: '您领取的折扣和奖励',

      couponWallet: '优惠券钱包',

      couponsAvailable: '有 {{count}} 张可用优惠券',

      tabs: {
        available: '可用',
        used: '已使用',
        expired: '已过期',
      },

      noCoupons: '暂无优惠券',

      emptyMessages: {
        available: '您目前没有可使用的优惠券。',
        used: '您目前没有已使用的优惠券。',
        expired: '您目前没有已过期的优惠券。',
      },

      explorePromotions: '浏览优惠活动',

      code: '代码',

      expires: '有效期至 {{date}}',

      status: {
        used: '已使用',
        expired: '已过期',
      },

      info: '您可以在为电动车充电付款时选择可用的优惠券。',
    },
  },
};

export default zh;
