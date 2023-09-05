import {
	formAssert,
	interactor,
	vcAssert,
} from '@sprucelabs/heartwood-view-controllers'
import { fake } from '@sprucelabs/spruce-test-fixtures'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test } from '@sprucelabs/test-utils'
import MetaSkillViewController from '../../skillViewControllers/Meta.svc'

@fake.login()
export default class MetaSkillViewTest extends AbstractSpruceFixtureTest {
	private static vc: SpyMetaSkillView

	public static async beforeEach() {
		await super.beforeEach()

		this.views.setController('eightbitstories.meta', SpyMetaSkillView)
		this.vc = this.views.Controller(
			'eightbitstories.meta',
			{}
		) as SpyMetaSkillView
	}

	@test()
	protected static async rendersACard() {
		vcAssert.assertSkillViewRendersCard(this.vc)
	}

	@test()
	protected static async redirectsOnClickToBack() {
		await this.loadVc()
		await this.assertClickingButtonRedirectsToRoot('back')
	}

	@test()
	protected static async redirectsOnClickToSave() {
		await this.loadVc()
		await this.assertClickingButtonRedirectsToRoot('save')
	}

	@test()
	protected static async rendersForm() {
		formAssert.cardRendersForm(this.cardVc)
	}

	@test()
	protected static async rendersExpectedFormFields() {
		formAssert.formRendersFields(this.formVc, ['name', 'values'])
	}

	private static async assertClickingButtonRedirectsToRoot(
		action: 'back' | 'save'
	) {
		const strategy = {
			back: () => interactor.cancelForm(this.formVc),
			save: () => interactor.submitForm(this.formVc),
		}

		await vcAssert.assertActionRedirects({
			action: () => strategy[action](),
			router: this.views.getRouter(),
			destination: {
				id: 'eightbitstories.root',
			},
		})
	}

	private static async loadVc() {
		await this.views.load(this.vc)
	}

	private static get cardVc() {
		return this.vc.getCardVc()
	}

	private static get formVc() {
		return this.vc.getFormVc()
	}
}

class SpyMetaSkillView extends MetaSkillViewController {
	public getFormVc() {
		return this.formVc
	}
	public getCardVc() {
		return this.cardVc
	}
}
