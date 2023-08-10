import config from '.';

export const administrationRoles = ['admin'];
const routes = {
	home_page: {
		path: '/'
	},

	account_pages: {
		name: 'Account',
		path: '/dashboard',
		navigationPath: '/dashboard',
		children: {
			child_page: {
				path: 'children',
				navigationPath: '/dashboard/children',
				children: {
					create_child_page: {
						path: 'create',
						name: 'children',
						navigationPath: '/dashboard/children/create'
					},
					child_page: {
						path: '',
						name: 'children',
						navigationPath: '/dashboard/children'
					},
					edit_child_page: {
						path: 'edit',
						name: 'children',
						navigationPath: '/dashboard/children/edit'
					},
					child_diagnosis_page: {
						path: 'edit',
						name: 'children',
						navigationPath: '/account/children/edit'
					}
				}
			},
			diagnosis_page: {
				path: 'diagnosis',
				navigationPath: '/dashboard/diagnosis',
				children: {
					diagnostic_all_page: {
						path: 'all',
						name: 'diagnosis',
						navigationPath: `/dashboard/diagnosis/all`
					},
					diagnosis_page: {
						path: '',
						name: 'diagnosis',
						navigationPath: `/dashboard/diagnosis`
					},
					diagnostic_test_child_page: {
						path: 'child',
						name: 'diagnosis',
						navigationPath: `/dashboard/diagnosis?`
					}
				}
			},
			evaluation_page: {
				path: 'evaluation',
				navigationPath: '/dashboard/evaluation',
				children: {
					export_page: {
						path: 'export',
						name: 'export',
						navigationPath: `/dashboard/evaluation/export`
					},
					profile_page: {
						path: 'profile',
						name: 'profile',
						navigationPath: `/dashboard/evaluation/profile`
					},
					evaluation_page: {
						path: '',
						name: 'evaluation',
						navigationPath: `/dashboard/evaluation`
					},
					result_page: {
						path: 'results',
						name: 'results',
						navigationPath: `/dashboard/evaluation/results`
					},
					export_eval_page: {
						path: 'export',
						navigationPath: '/dashboard/evaluation/export/pdf'
					}
				}
			},
			downloads_page: {
				path: 'downloads',
				navigationPath: '/dashboard/downloads'
			}
		}
	},

	test_pages: {
		path: 'test',
		name: 'diagnostic_test',
		navigationPath: '/test'
	},
	meta_pages: {
		name: 'Meta',
		path: '/meta',

		children: {
			about_page: {
				path: 'about',
				name: 'Meta',
				navigationPath: '/meta/about'
			},

			buy_page: {
				path: 'buy',
				name: 'Buy',
				navigationPath: config.API_Config.shop_url
			},

			faq_page: {
				path: 'faq',
				name: 'Faq',
				navigationPath: config.API_Config.faq_url
			},
			
			imprint_page: {
				path: 'impressum',
				navigationPath: '/meta/impressum'
			}
		}
	},

	securities_pages: {
		login: {
			path: '/login'
		},
		login_check: {
			path: '/login-check'
		},
		callback: {
			path: '/callback'
		},
		account_verify: {
			path: '/account-verify'
		},
		notFound_page: {
			path: '/404'
		},
		unauthorized_page: {
			path: '/401'
		}
	}
};
export default routes;
