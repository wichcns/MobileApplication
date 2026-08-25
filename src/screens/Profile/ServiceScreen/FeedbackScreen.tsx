import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
  SafeAreaView,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';
import apiClient from '../../../api/client';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type ProfileStackParamList = {
  ProfileHome: undefined;
  PersonalInformation: undefined;
  CreditPayment: undefined;
  AddCreditCard: undefined;
  Promotion: undefined;
  PromotionDetail: undefined;
  MyCoupons: undefined;
  GoogleForm: undefined;
  ChargingStations: undefined;
  Language: undefined;
  Service: undefined;
  Feedback: undefined;
};

type Props = NativeStackScreenProps<ProfileStackParamList, 'Feedback'>;

export default function FeedbackScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const [rating, setRating] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const feedbackTopics = [
    {
      key: 'application',
      label: t('feedback.application'),
    },
    {
      key: 'charging',
      label: t('feedback.charging'),
    },
    {
      key: 'payment',
      label: t('feedback.payment'),
    },
    {
      key: 'service',
      label: t('feedback.service'),
    },
    {
      key: 'other',
      label: t('feedback.other'),
    },
  ];

  const getRatingText = () => {
    switch (rating) {
      case 1:
        return t('feedback.veryDissatisfied');

      case 2:
        return t('feedback.dissatisfied');

      case 3:
        return t('feedback.neutral');

      case 4:
        return t('feedback.satisfied');

      case 5:
        return t('feedback.verySatisfied');

      default:
        return t('feedback.noRatingSelected');
    }
  };

  const handleSubmit = async () => {
    if (!rating || !selectedTopic || isSubmitting) {
      return;
    }

    // Backend รองรับฟิลด์ message เพียงฟิลด์เดียว จึงเก็บรายละเอียด
    // ของหัวข้อและคะแนนไว้ในข้อความเดียวกันเพื่อไม่ให้ข้อมูลสูญหาย
    const message = [
      `Rating: ${rating}/5`,
      `Topic: ${selectedTopic}`,
      comment.trim() || 'No additional comment',
    ].join('\n');

    try {
      setIsSubmitting(true);
      await apiClient.post('/feedbacks/me', { message });
      Alert.alert(t('common.success'), t('feedback.thankYou'), [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      console.log('[Feedback] Submit failed', {
        status: error?.response?.status,
        message: error?.response?.data?.message || error?.message,
      });
      Alert.alert(t('common.error'), 'Unable to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{t('feedback.title')}</Text>

        <View style={styles.headerRight} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* =====================================================
            INTRO
        ====================================================== */}

        <View style={styles.intro}>
          <View style={styles.feedbackIcon}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={30}
              color="#00A651"
            />
          </View>

          <Text style={styles.title}>{t('feedback.howWasYourExperience')}</Text>

          <Text style={styles.description}>{t('feedback.introduction')}</Text>
        </View>

        {/* =====================================================
            RATING
        ====================================================== */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            {t('feedback.rateYourExperience')}
          </Text>

          <Text style={styles.sectionDescription}>
            {t('feedback.tapStarToRate')}
          </Text>

          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity
                key={star}
                activeOpacity={0.7}
                onPress={() => setRating(star)}
                style={styles.starButton}
              >
                <Ionicons
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={38}
                  color={star <= rating ? '#FBBF24' : '#CBD5E1'}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.ratingText}>{getRatingText()}</Text>
        </View>

        {/* =====================================================
            TOPIC
        ====================================================== */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('feedback.feedbackAbout')}</Text>

          <View style={styles.topicContainer}>
            {feedbackTopics.map(topic => {
              const selected = selectedTopic === topic.key;

              return (
                <TouchableOpacity
                  key={topic.key}
                  activeOpacity={0.7}
                  style={[
                    styles.topicButton,
                    selected && styles.topicButtonSelected,
                  ]}
                  onPress={() => setSelectedTopic(topic.key)}
                >
                  <Text
                    style={[
                      styles.topicText,
                      selected && styles.topicTextSelected,
                    ]}
                  >
                    {topic.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* =====================================================
            COMMENT
        ====================================================== */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('feedback.tellUsMore')}</Text>

          <Text style={styles.sectionDescription}>
            {t('feedback.commentsDescription')}
          </Text>

          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder={t('feedback.placeholder')}
            placeholderTextColor="#94A3B8"
            multiline
            textAlignVertical="top"
            style={styles.textInput}
            maxLength={500}
          />

          <Text style={styles.characterCount}>{comment.length}/500</Text>
        </View>

        {/* =====================================================
            SUBMIT
        ====================================================== */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.submitButton,
            (!rating || !selectedTopic || isSubmitting) && styles.submitButtonDisabled,
          ]}
          disabled={!rating || !selectedTopic || isSubmitting}
          onPress={handleSubmit}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="send-outline" size={20} color="#FFFFFF" />
              <Text style={styles.submitText}>{t('feedback.submitFeedback')}</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.footerText}>{t('feedback.thankYou')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7F6',
  },

  content: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 35,
  },

  header: {
    height: 56,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingHorizontal: 10,

    backgroundColor: '#FFFFFF',

    borderBottomWidth: 1,

    borderBottomColor: '#E5E7EB',
  },

  backButton: {
    width: 40,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    flex: 1,

    textAlign: 'center',

    fontSize: 18,

    fontWeight: '700',

    color: '#111827',
  },

  headerRight: {
    width: 40,
  },

  intro: {
    alignItems: 'center',

    paddingHorizontal: 10,

    paddingBottom: 18,
  },

  feedbackIcon: {
    width: 62,

    height: 62,

    borderRadius: 31,

    backgroundColor: '#E8F8F0',

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 12,
  },

  title: {
    fontSize: 20,

    fontWeight: '800',

    color: '#111827',

    textAlign: 'center',
  },

  description: {
    marginTop: 5,

    fontSize: 13,

    lineHeight: 19,

    color: '#64748B',

    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    padding: 16,

    marginBottom: 12,

    borderWidth: 1,

    borderColor: '#E8F0EE',
  },

  sectionTitle: {
    fontSize: 15,

    fontWeight: '700',

    color: '#1E293B',
  },

  sectionDescription: {
    marginTop: 4,

    fontSize: 12,

    lineHeight: 18,

    color: '#64748B',
  },

  ratingContainer: {
    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: 15,
  },

  starButton: {
    paddingHorizontal: 5,
  },

  ratingText: {
    marginTop: 8,

    textAlign: 'center',

    fontSize: 12,

    fontWeight: '600',

    color: '#64748B',
  },

  topicContainer: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    marginTop: 13,

    gap: 8,
  },

  topicButton: {
    paddingHorizontal: 13,

    height: 36,

    borderRadius: 18,

    backgroundColor: '#F8FAFC',

    borderWidth: 1,

    borderColor: '#E2E8F0',

    justifyContent: 'center',

    alignItems: 'center',
  },

  topicButtonSelected: {
    backgroundColor: '#E8F8F0',

    borderColor: '#00A651',
  },

  topicText: {
    fontSize: 12,

    fontWeight: '600',

    color: '#64748B',
  },

  topicTextSelected: {
    color: '#008F48',

    fontWeight: '700',
  },

  textInput: {
    marginTop: 13,

    minHeight: 120,

    borderRadius: 12,

    borderWidth: 1,

    borderColor: '#E2E8F0',

    backgroundColor: '#F8FAFC',

    paddingHorizontal: 12,

    paddingTop: 12,

    paddingBottom: 12,

    fontSize: 13,

    lineHeight: 19,

    color: '#1E293B',
  },

  characterCount: {
    marginTop: 5,

    textAlign: 'right',

    fontSize: 10,

    color: '#94A3B8',
  },

  submitButton: {
    height: 52,

    borderRadius: 15,

    backgroundColor: '#00A651',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    marginTop: 2,
  },

  submitButtonDisabled: {
    backgroundColor: '#A7D9BF',
  },

  submitText: {
    marginLeft: 8,

    fontSize: 15,

    fontWeight: '700',

    color: '#FFFFFF',
  },

  footerText: {
    marginTop: 12,

    textAlign: 'center',

    fontSize: 11,

    color: '#94A3B8',
  },
});
