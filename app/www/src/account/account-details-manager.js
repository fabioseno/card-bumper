(function () {
	'use strict';

	function AccountDetailsManager(invoker, businessCardsService, listSelectorManager) {
		var formData = businessCardsService.getMyBusinessCard(),
			crmState = {},
			addressState = {},

			states = [
				{ code: 'AC', name: 'Acre' },
				{ code: 'AL', name: 'Alagoas' },
				{ code: 'AM', name: 'Amazonas' },
				{ code: 'AP', name: 'Amapá' },
				{ code: 'BA', name: 'Bahia' },
				{ code: 'CE', name: 'Ceará' },
				{ code: 'DF', name: 'Distrito Federal' },
				{ code: 'ES', name: 'Espírito Santo' },
				{ code: 'GO', name: 'Goiás' },
				{ code: 'MA', name: 'Maranhão' },
				{ code: 'MG', name: 'Minas Gerais' },
				{ code: 'MS', name: 'Mato Grosso do Sul' },
				{ code: 'MT', name: 'Mato Grosso' },
				{ code: 'PA', name: 'Pará' },
				{ code: 'PB', name: 'Paraíba' },
				{ code: 'PE', name: 'Pernambuco' },
				{ code: 'PI', name: 'Piauí' },
				{ code: 'PR', name: 'Paraná' },
				{ code: 'RJ', name: 'Rio de Janeiro' },
				{ code: 'RN', name: 'Rio Grande do Norte' },
				{ code: 'RO', name: 'Rondônia' },
				{ code: 'RR', name: 'Roraima' },
				{ code: 'RS', name: 'Rio Grande do Sul' },
				{ code: 'SC', name: 'Santa Catarina' },
				{ code: 'SE', name: 'Sergipe' },
				{ code: 'SP', name: 'São Paulo' },
				{ code: 'TO', name: 'Tocantins' }
			],

			expertises = [
				{ code: 1, name: "Acupuntura" },
				{ code: 2, name: "Alergia e Imunologia" },
				{ code: 3, name: "Anestesiologia" },
				{ code: 4, name: "Angiologia" },
				{ code: 5, name: "Cancerologia" },
				{ code: 6, name: "Cardiologia" },
				{ code: 7, name: "Cirurgia Cardiovascular" },
				{ code: 8, name: "Cirurgia da Mão" },
				{ code: 9, name: "Cirurgia de Cabeça e Pescoço" },
				{ code: 10, name: "Cirurgia do Aparelho Digestivo" },
				{ code: 11, name: "Cirurgia Geral" },
				{ code: 12, name: "Cirurgia Pediátrica" },
				{ code: 13, name: "Cirurgia Plástica" },
				{ code: 14, name: "Cirurgia Torácica" },
				{ code: 15, name: "Cirurgia Vascular" },
				{ code: 16, name: "Clínica Médica" },
				{ code: 17, name: "Coloproctologia" },
				{ code: 18, name: "Dermatologia" },
				{ code: 19, name: "Endocrinologia e Metabologia" },
				{ code: 20, name: "Endoscopia" },
				{ code: 21, name: "Gastroenterologia" },
				{ code: 22, name: "Genética Médica" },
				{ code: 23, name: "Geriatria" },
				{ code: 24, name: "Ginecologia e Obstetrícia" },
				{ code: 25, name: "Hematologia e Hemoterapia" },
				{ code: 26, name: "Homeopatia" },
				{ code: 27, name: "Infectologia" },
				{ code: 28, name: "Mastologia" },
				{ code: 29, name: "Medicina de Família e Comunidade" },
				{ code: 30, name: "Medicina do Trabalho" },
				{ code: 31, name: "Medicina de Tráfego" },
				{ code: 32, name: "Medicina Esportiva" },
				{ code: 33, name: "Medicina Física e Reabilitação" },
				{ code: 34, name: "Medicina Intensiva" },
				{ code: 35, name: "Medicina Legal e Perícia Médica" },
				{ code: 36, name: "Medicina Nuclear" },
				{ code: 37, name: "Medicina Preventiva e Social" },
				{ code: 38, name: "Nefrologia" },
				{ code: 39, name: "Neurocirurgia" },
				{ code: 40, name: "Neurologia" },
				{ code: 41, name: "Nutrologia" },
				{ code: 42, name: "Oftalmologia" },
				{ code: 43, name: "Ortopedia e Traumatologia" },
				{ code: 44, name: "Otorrinolaringologia" },
				{ code: 45, name: "Patologia" },
				{ code: 46, name: "Patologia Clínica/Medicina Laboratorial" },
				{ code: 47, name: "Pediatria" },
				{ code: 48, name: "Pneumologia" },
				{ code: 49, name: "Psiquiatria" },
				{ code: 50, name: "Radiologia e Diagnóstico por Imagem" },
				{ code: 51, name: "Radioterapia" },
				{ code: 52, name: "Reumatologia" },
				{ code: 53, name: "Urologia " }
			],

			getState = function (uf) {
				var state;

				for (var i = 0; i < states.length; i++) {
					if (states[i].code === uf) {
						state = states[i];
						break
					}
				}

				return state;
			},

			getExpertisesObject = function (values) {
				var result = [];

				if (values) {
					for (var i = 0; i < values.length; i++) {
						for (var j = 0; j < expertises.length; j++) {
							if (values[i] === expertises[j].code) {
								result.push(expertises[j]);
								break
							}
						}
					}
				}

				return result;
			},

			getFormattedState = function (uf) {
				var value;

				for (var i = 0; i < states.length; i++) {
					if (states[i].code === uf) {
						var state = states[i];

						if (state) {
							value = state.code + ' - ' + state.name;
						}
						break
					}
				}

				return value;
			},

			getFormattedExpertises = function (values) {
				var result, temp = [];

				if (values) {
					for (var i = 0; i < values.length; i++) {
						for (var j = 0; j < expertises.length; j++) {
							if (values[i] === expertises[j].code) {
								temp.push(expertises[j]);
								break;
							}
						}
					}
					
					result = temp.map(function (item) {
						return item.name;
					}).join(', ');
				}

				return result;
			},

			searchAddress = function (zipCode) {
				var params = {
					query: {
						zipCode: zipCode
					}
				};

				return invoker.call('registration', 'searchAddress', params);
			},

			getExpertises = function () {
				return listSelectorManager.getSelectedItems('expertises');
			},

			getCrmState = function () {
				var items = listSelectorManager.getSelectedItems('crm-state'),
					state = {};

				if (items && items.length > 0) {
					state = items[0];
				}

				return state;
			},

			getAddressState = function () {
				var items = listSelectorManager.getSelectedItems('address-state'),
					state = {};


				if (items && items.length > 0) {
					state = items[0];
				}

				return state;
			},

			getAccountDetails = function () {
				var expertises = getExpertises(),
					crmState = getCrmState(),
					addressState = getAddressState();

				if (expertises && expertises.length > 0) {
					formData.expertises = expertises.map(function(item) {
						return item.code;
					});
				} else {
					listSelectorManager.setSelectedItems('expertises', getExpertisesObject(formData.expertises));
				}

				if (crmState && crmState.code) {
					formData.crmState = crmState.code;
				} else {
					if (formData.crmState) {
						listSelectorManager.setSelectedItems('crm-state', [getState(formData.crmState)]);
					}
				}

				if (addressState && addressState.code) {
					formData.addressState = addressState.code;
				} else {
					if (formData.addressState) {
						listSelectorManager.setSelectedItems('address-state', [getState(formData.addressState)]);
					}
				}

				return formData;
			},

			saveAccountDetails = function (data) {
				formData = data;
			};

		return {
			states: states,
			expertises: expertises,

			getState: getState,
			getFormattedState: getFormattedState,
			getFormattedExpertises: getFormattedExpertises,
			searchAddress: searchAddress,

			getAccountDetails: getAccountDetails,
			saveAccountDetails: saveAccountDetails
		};
	}

	AccountDetailsManager.$inject = ['invoker', 'businessCardsService', 'listSelectorManager'];

	angular.module('app').service('accountDetailsManager', AccountDetailsManager);

}());