import { wallet } from '../store/walletStore';

const en = {
  translation: {
    bottomTab: {
      home: 'Home',
      wallet: 'Wallet',
      qr: 'QR',
      history: 'History',
      profile: 'Profile',
    },

    common: {
      back: 'Back',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      loading: 'Loading...',
      currency: '฿',
      continue: 'Continue',
      success: 'Success',
      error: 'Error',
    },

    selectBank: {
      title: 'Select Bank',
      topUpAmount: 'Top Up Amount',
      selectYourBank: 'Select your bank',
    },

    paymentMethod: {
      title: 'Payment Method',
      topUpAmount: 'Top Up Amount',
      choosePaymentMethod: 'Choose payment method',

      bankTransfer: 'Bank Transfer',
      bankTransferSubtitle: 'Select your bank and pay via QR',

      mobileBanking: 'Mobile Banking',
      mobileBankingSubtitle: 'Scan QR from your banking app',

      creditCard: 'Credit Card',
      creditCardSubtitle: 'Visa / Mastercard',
    },

    paymentProcessing: {
      title: 'Processing Payment',
      subtitle: 'Please wait while we verify your payment',
    },

    topUp: {
      title: 'Top Up Wallet',
      selectAmount: 'Select Amount',
      customAmount: 'Custom Amount',
      enterAmount: 'Enter amount',
    },

    qrPayment: {
      title: 'QR Payment',
      paymentBank: 'Payment Bank',
      amount: 'Amount',
      scanQrToPay: 'Scan QR to Pay',
      iHavePaid: 'I Have Paid',
    },

    history: {
      title: 'Charging History',
      searchPlaceholder: 'Search charging history...',
    },

    taxInvoice: {
      title: 'Tax Invoice',
      description: 'Request electronic tax invoice for charging transaction.',

      chargingInformation: 'Charging Information',
      receiptNo: 'Receipt No:',
      auto: 'AUTO',
      energy: 'Energy',
      duration: 'Duration',
      totalPaid: 'Total Paid',

      taxpayerInformation: 'Taxpayer Information',
      companyName: 'Company Name',
      taxId: 'Tax ID',

      addressInformation: 'Address Information',
      address: 'Address',
      province: 'Province',
      district: 'District',
      subdistrict: 'Subdistrict',
      postalCode: 'Postal Code',

      contactInformation: 'Contact Information',
      phoneNumber: 'Phone Number',
      emailAddress: 'Email Address',

      informationSecurity: 'Information Security',
      securityDescription:
        'Your information will only be used for generating electronic tax invoice.',

      submitRequest: 'Submit Request',

      incompleteInformation: 'Incomplete Information',
      completeAllInformation: 'Please complete all information.',

      success: 'Success',
      requestSubmitted: 'Tax invoice request submitted.',
    },

    taxInvoiceForm: {
      title: 'Tax Invoice',

      description:
        'Enter your billing information\nto request an e-Tax Invoice.',

      taxpayerInformation: 'Taxpayer Information',

      companyName: 'Company Name',

      taxId: 'Tax ID',

      addressInformation: 'Address Information',

      address: 'Address',

      province: 'Province',

      district: 'District',

      subdistrict: 'Subdistrict',

      postalCode: 'Postal Code',

      contactInformation: 'Contact Information',

      phoneNumber: 'Phone Number',

      emailAddress: 'Email Address',

      confidentialTitle: 'Your information will be kept confidential',

      confidentialDescription:
        'This information will only be used for generating electronic tax invoices.',

      submitRequest: 'Submit Request',

      incompleteInformation: 'Incomplete Information',

      fillRequiredFields: 'Please fill in all required fields.',

      success: 'Success',

      requestSubmitted: 'Your tax invoice request has been submitted.',
    },

    chargingHistoryDetail: {
      title: 'Charging Receipt',
      noData: 'No Data',
      historyNotFound: 'Charging history not found.',

      receiptNo: 'Receipt No',

      chargingInformation: 'Charging Information',
      charger: 'Charger',
      connector: 'Connector',
      energy: 'Energy',
      duration: 'Duration',

      paymentSummary: 'Payment Summary',
      chargingFee: 'Charging Fee',
      serviceFee: 'Service Fee',
      vat: 'VAT',
      included: 'Included',
      totalPaid: 'Total Paid',

      saveReceipt: 'Save Receipt',
      saveReceiptSubtitle: 'Save a copy to your device',

      requestTaxInvoice: 'Request Tax Invoice',

      receiptSaved: 'Receipt saved to your device.',
      receiptSaveError: 'Cannot save receipt.',
    },

    profile: {
      title: 'Profile',
      myAccount: 'My Account',
      availableBalance: 'Available Balance',
      couponCard: 'Coupon & Card',
      myCar: 'My Car',
      totalKwh: 'Total kWh',
      reduceCo2: 'Reduce CO₂',

      favorite: 'Favorite',
      reservation: 'Reservation',
      language: 'Language',
      service: 'Service',

      creditPayment: 'Credit Payment',
      promotionCoupons: 'Promotion / Coupons',
      chargingStations: 'Charging Stations',
      switchCountry: 'Switch Country',
      about: 'About',

      logout: 'Logout',
    },

    personalInformation: {
      title: 'Personal Information',

      subtitle: 'Manage your personal account information',

      user: 'User',

      noEmail: 'No email',

      personalInformation: 'Personal Information',

      firstName: 'FirstName',

      lastName: 'LastName',

      emailAddress: 'Email Address',

      phoneNumber: 'Phone Number',

      securityTitle: 'Your information is secure',

      securityDescription:
        'Your personal information is stored securely and will only be used for your account.',

      saveChanges: 'Save Changes',

      incompleteInformation: 'Incomplete Information',

      enterName: 'Please enter your name.',

      enterEmail: 'Please enter your email.',

      enterPhone: 'Please enter your phone number.',

      cannotSelectImage: 'Cannot select image.',

      updated: 'Your personal information has been updated.',
    },

    home: {
      nearbyStations: 'Nearby Stations',
      chargingStations: 'Charging Stations',
      searchChargingStation: 'Search charging station...',
      all: 'All',
      available: 'Available',
      showList: 'Show List',
    },

    station: {
      chargingStation: 'Charging Station',
      open24Hours: 'OPEN 24 hours',
      price: 'Price',
      detail: 'Detail',
      allChargers: 'All Chargers',
      available: 'Available',
      unavailable: 'Unavailable',
      delayFreeTime: 'Delay fee is completely free',
      startCharging: 'Start Charging',
      goHere: 'Go Here',
      promotion: 'Faster charging, better experience',
      fasterCharging: 'Faster charging, better experience',
      getDirections: 'Get Directions',
    },

    readyToCharge: {
      title: 'Ready to Charge',
      noChargerSelected: 'No charger selected.',

      addMyCar: 'Add My Car',

      paymentSetting: 'Payment Setting',
      balancePayment: 'Balance Payment',
      topUp: 'Top Up',
      insufficientBalanceTip:
        'Tip: If the balance is insufficient, charging will end automatically.',

      creditPayment: 'Credit Payment',
      addCreditCard: '+ Add Credit Card',

      discount: 'Discount',
      prepaidCard: 'Prepaid Card',
      noCards: 'No Cards',
      couponDiscountCard: 'Coupon / Discount Card',
      noCoupons: 'No Coupons',

      chargingStrategy: 'Charging Strategy',
      maxSoc: 'Max SOC',

      plugConnectorWarning: 'Please plug the connector into your car!',
      startCharging: 'Start Charging',
      connector: 'Connector',
    },

    qrScanner: {
      title: 'QR Scanner',
      invalidChargingInformation: 'Invalid charging information.',

      requestingCameraPermission: 'Requesting Camera Permission',
      allowCameraAccess: 'Please allow camera access to scan the QR Code.',

      cameraPermissionRequired: 'Camera Permission Required',
      allowCameraAccessToUseScanner:
        'Please allow camera access to use QR Scanner.',
      allowCamera: 'Allow Camera',

      cameraNotAvailable: 'Camera Not Available',
      unableToAccessCamera: 'Unable to access the device camera.',

      scanChargerQr: 'Scan charger QR Code',
      positionQrCode: 'Position the QR Code inside the frame',

      chargingInformation: 'Charging Information',
      station: 'Station',
      charger: 'Charger',
      connector: 'Connector',

      confirmStartCharging: 'Confirm Start Charging',
    },

    charging: {
      charging: 'Charging',
      preparing: 'Preparing',
      finishing: 'Finishing',
      completed: 'Completed',

      maxOutput: 'Max Output',
      liveCharging: 'Live Charging',

      energy: 'Energy',
      duration: 'Duration',
      cost: 'Cost',
      power: 'Power',

      stopCharging: 'Stop Charging',

      stopChargingTitle: 'Stop Charging',
      stopChargingConfirmation: 'Are you sure you want to stop charging?',
      cancel: 'Cancel',
      stop: 'Stop',
    },

    chargingSummary: {
      title: 'Charging Summary',
      chargingCompleted: 'Charging Completed',

      station: 'Station',
      charger: 'Charger',
      connector: 'Connector',

      duration: 'Duration',
      energyUsed: 'Energy Used',
      power: 'Power',
      chargingCost: 'Charging Cost',
      serviceFee: 'Service Fee',
      vat: 'VAT 7%',
      total: 'Total',
      pricePerKwh: 'Charging Price per kWh',
      proceedPayment: 'Proceed Payment',
    },

    payment: {
      title: 'Payment',

      paymentRequired: 'Payment Required',
      reviewPayment: 'Review your payment before confirming',

      chargingAmount: 'Charging Amount',

      coupon: 'Coupon',
      selectCoupon: 'Select Coupon',
      couponsAvailable: 'coupons available',
      removeCoupon: 'Remove Coupon',

      noCoupons: 'No Coupons',
      noAvailableCoupons: 'You do not have any available coupons.',

      originalAmount: 'Original Amount',
      couponDiscount: 'Coupon Discount',
      totalPayment: 'Total Payment',

      selectPaymentMethod: 'Select Payment Method',

      wallet: 'Wallet',
      balance: 'Balance',
      creditCard: 'Credit Card',
      paySecurelyWithCard: 'Pay securely with your card',

      info: 'Your coupon will only be marked as used after the payment is completed successfully.',

      confirmPayment: 'Confirm Payment',

      paymentMethodRequired: 'Payment Method Required',
      selectPaymentMethodMessage: 'Please select a payment method.',

      paymentFailed: 'Payment Failed',
      insufficientWalletBalance: 'Insufficient wallet balance.',

      couponError: 'Coupon Error',
      couponCouldNotBeUsed: 'The selected coupon could not be used.',

      selectCouponTitle: 'Select Coupon',
      selectCouponSubtitle: 'Choose one available coupon',

      code: 'CODE',
      expires: 'Expires',
      noCouponsAvailable: 'No Coupons Available',

      collectPromotion:
        'Collect a promotion first to use a coupon during payment.',
      creditCardNotAvailable: 'Credit card payment is not available at this time.',
    },

    receipt: {
      title: 'Receipt',
      paymentSuccessful: 'Payment Successful',
      chargingPaymentCompleted: 'Your charging payment has been completed.',

      chargingInformation: 'Charging Information',
      station: 'Station',
      charger: 'Charger',
      connector: 'Connector',
      energy: 'Energy',
      chargingDuration: 'Charging Duration',
      endTime: 'End Time',

      paymentSummary: 'Payment Summary',
      chargingAmount: 'Charging Amount',
      couponDiscount: 'Coupon Discount',
      totalPayment: 'Total Payment',

      paymentInformation: 'Payment Information',
      paymentMethod: 'Payment Method',
      transactionId: 'Transaction ID',
      paidAt: 'Paid At',

      saveReceipt: 'Save Receipt',
      saveReceiptDescription: 'Save a copy to your device',

      requestTaxInvoice: 'Request Tax Invoice',
      taxInvoiceDescription: 'Get an official tax invoice',

      backToHome: 'Back to Home',
    },

    wallet: {
      walletBalance: 'Wallet Balance',
      updated: 'Updated',
      viewAll: 'View All',
    },

    language: {
      title: 'Language',
      selectLanguage: 'Select Language',
      thai: 'ไทย',
      english: 'English',
      chinese: '中文',
    },

    service: {
      title: 'Service',

      howCanWeHelp: 'How can we help?',

      description:
        'Choose a service below to send feedback or get help from our support team.',

      feedback: 'Feedback',

      feedbackDescription: 'Share your experience and help us improve',

      onlineService: 'Online Service',

      online: 'Online',

      onlineServiceDescription: 'Contact our support team for assistance',

      needHelp: 'Need help?',

      supportDescription:
        'Our support team is available to assist you with charging, payment, account, and application issues.',
    },

    feedback: {
      title: 'Feedback',

      howWasYourExperience: 'How was your experience?',

      introduction: 'Your feedback helps us improve the GSB EV experience.',

      rateYourExperience: 'Rate your experience',

      tapStarToRate: 'Tap a star to rate your experience',

      noRatingSelected: 'No rating selected',

      veryDissatisfied: 'Very dissatisfied',

      dissatisfied: 'Dissatisfied',

      neutral: 'Neutral',

      satisfied: 'Satisfied',

      verySatisfied: 'Very satisfied',

      feedbackAbout: 'What would you like to give feedback about?',

      application: 'Application',

      charging: 'Charging',

      payment: 'Payment',

      service: 'Service',

      other: 'Other',

      tellUsMore: 'Tell us more',

      commentsDescription: 'Please share any comments or suggestions.',

      placeholder: 'Write your feedback here...',

      submitFeedback: 'Submit Feedback',

      thankYou: 'Thank you for helping us improve our service.',
    },

    onlineService: {
      title: 'Online Service',

      howCanWeHelp: 'How can we help?',

      description:
        'Contact our support team through one of the following channels.',

      onlineSupport: 'Online Support',

      line: 'LINE',

      lineDescription: 'Chat with our support team',

      facebook: 'Facebook',

      facebookDescription: 'Follow us or send us a message',

      callCenter: 'Call Center',

      customerSupport: 'Customer Support',

      supportDescription:
        'Our support team can help you with charging, payment, account, and application issues.',

      cannotOpen: 'Unable to Open',

      cannotOpenService: 'Unable to open this service channel.',

      error: 'Error',

      cannotOpenServiceChannel: 'Unable to open the service channel.',

      cannotCall: 'Unable to Call',

      deviceCannotCall: 'This device does not support making phone calls.',
    },

    creditPayment: {
      title: 'Credit Payment',
      subtitle: 'Manage your payment cards',

      paymentMethods: 'Payment Methods',
      savedCreditCards: 'Your saved credit cards',

      noCreditCard: 'No Credit Card Added',
      noCreditCardDescription:
        'Add a credit card to make your charging payments faster and easier.',
      addCreditCard: 'Add Credit Card',

      default: 'DEFAULT',
      cardHolder: 'CARD HOLDER',

      defaultCard: 'Default Card',
      defaultCardMessage: 'This card is already your default payment method.',

      removeCreditCard: 'Remove Credit Card',
      removeCreditCardMessage: 'Are you sure you want to remove this card?',
      cancel: 'Cancel',
      remove: 'Remove',

      addAnotherCreditCard: 'Add Another Credit Card',
      addAnotherCreditCardDescription: 'Add another card for payment',

      securityTitle: 'Your payment information is secure',
      securityDescription:
        'Your card information is securely protected and used only for payment processing.',

      error: 'Error',
      cannotRemoveCard: 'Unable to remove credit card.',
    },

    addCreditCard: {
      title: 'Add Credit Card',
      subtitle: 'Add a card for charging payments',

      cardBrand: 'CREDIT CARD',
      cardholder: 'CARDHOLDER',
      yourName: 'YOUR NAME',
      expires: 'EXPIRES',

      cardInformation: 'Card Information',

      cardholderName: 'Cardholder Name',
      cardholderNamePlaceholder: 'Enter cardholder name',

      cardNumber: 'Card Number',
      cardNumberPlaceholder: '1234 5678 9012 3456',

      expiryDate: 'Expiry Date',
      expiryDatePlaceholder: 'MM/YY',

      cvv: 'CVV',
      cvvPlaceholder: '123',

      securityTitle: 'Your payment information is secure',
      securityDescription:
        'Your card details are protected and used only for payment processing.',

      addButton: 'Add Credit Card',

      incompleteInformation: 'Incomplete Information',
      enterCardholderName: 'Please enter cardholder name.',
      enterCardNumber: 'Please enter card number.',
      enterExpiryDate: 'Please enter expiry date.',
      enterCvv: 'Please enter CVV.',

      success: 'Success',
      successMessage: 'Credit card has been added successfully.',
      ok: 'OK',
    },

    about: {
      title: 'About',

      appDescription: 'EV Charging Application',

      version: 'Version',

      information: 'Information',

      aboutApplication: 'About Application',
      aboutApplicationDescription: 'Information about GSB EV',

      terms: 'Terms & Conditions',
      termsDescription: 'Terms of use and service',

      privacyPolicy: 'Privacy Policy',
      privacyPolicyDescription: 'How we protect your information',

      contactUs: 'Contact Us',
      contactUsDescription: 'Get help and contact support',

      poweredBy: 'Powered by',

      copyright: '© 2026 GSB Sunpower. All rights reserved.',

      footer: 'Made for a smarter EV charging experience',
    },

    promotion: {
      title: 'Promotions',
      subtitle: 'Discover and collect exclusive coupons',

      myCoupons: 'My Coupons',
      couponsAvailable: 'coupons available',
      view: 'View',

      explorePromotions: 'Explore Promotions',

      categories: {
        all: 'All',
        evCharging: 'EV Charging',
        hotel: 'Hotel',
        restaurant: 'Restaurant',
        travel: 'Travel',
        lifestyle: 'Lifestyle',
      },

      alreadyCollected: 'Already Collected',
      alreadyCollectedMessage: 'This coupon is already in My Coupons.',

      couponCollected: 'Coupon Collected',
      couponCollectedMessage: 'The coupon has been added to My Coupons.',

      expires: 'Expires',

      collected: 'Collected',
      collect: 'Collect',

      info: 'Collect coupons now and use them later during payment when charging your EV.',
    },

    promotionDetail: {
      title: 'Promotion Details',

      couponCode: 'Coupon Code',
      useCodeDuringPayment: 'Use this code during payment',
      code: 'Code',
      copy: 'Copy',

      validity: 'Validity',
      validUntil: 'Valid until',

      termsConditions: 'Terms & Conditions',

      termParticipatingLocations: 'Available at participating locations only.',

      termOnePerAccount: 'One coupon per account.',

      termCannotCombine: 'Cannot be combined with other promotions.',

      termValidPayment: 'Coupon must be valid at the time of payment.',

      notice:
        'After collecting this coupon, you can select it during payment when charging your EV.',

      collectCoupon: 'Collect Coupon',
      couponCollected: 'Coupon Collected',

      alreadyCollected: 'Already Collected',
      alreadyCollectedMessage: 'This coupon is already in My Coupons.',

      couponAddedMessage: 'This coupon has been added to My Coupons.',

      notFound: 'Promotion not found',
      goBack: 'Go Back',

      ok: 'OK',
    },

    myCoupons: {
      title: 'My Coupons',

      subtitle: 'Your collected discounts and rewards',

      couponWallet: 'Coupon Wallet',

      couponsAvailable: '{{count}} coupons available',

      tabs: {
        available: 'Available',
        used: 'Used',
        expired: 'Expired',
      },

      noCoupons: 'No Coupons',

      emptyMessages: {
        available: "You don't have any available coupons.",
        used: "You don't have any used coupons.",
        expired: "You don't have any expired coupons.",
      },

      explorePromotions: 'Explore Promotions',

      code: 'CODE',

      expires: 'Expires {{date}}',

      status: {
        used: 'Used',
        expired: 'Expired',
      },

      info: 'You can select an available coupon during payment when charging your EV.',
    },
  },
};

export default en;
