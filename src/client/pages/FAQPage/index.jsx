import React from 'react';
import Accordion from '../../components/FaqAccordionComponent';
import ContainerHeaderLayout from '../../layouts/ContainerHeaderLayout';

export default function FAQPage({t}) {
	const faqData = [
		{
		  question: t('faq_1_question'),
		  answer: t('faq_1_answer')
		},
		{
			question: t('faq_2_question'),
			answer: t('faq_2_answer')
		},
		{
			question: t('faq_3_question'),
			answer: t('faq_3_answer')
		}
	  ];
	return (
		<ContainerHeaderLayout hideWhiteBox title={t('faq_title')}>
                <div className="box text-center">
					<div className="padding">
						<Accordion faqs={faqData} />
					</div>
				</div>
		</ContainerHeaderLayout>
	)
}
