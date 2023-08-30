import {
	buttonAssert,
	interactor,
	vcAssert,
} from '@sprucelabs/heartwood-view-controllers'
import { fake } from '@sprucelabs/spruce-test-fixtures'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test, assert } from '@sprucelabs/test-utils'
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
	protected static async rendersExpectedButtons() {
		buttonAssert.cardRendersButtons(this.vc.getCardVc(), ['back', 'save'])
	}

	@test()
	protected static async redirectsOnClickToBack() {
		await this.views.load(this.vc)
		await this.assertClickingButtonRedirectsToRoot('back')
	}

	@test()
	protected static async redirectsOnClickToSave() {
		await this.views.load(this.vc)
		await this.assertClickingButtonRedirectsToRoot('save')
	}

	private static async assertClickingButtonRedirectsToRoot(buttonId: string) {
		await vcAssert.assertActionRedirects({
			action: () => interactor.clickButton(this.vc.getCardVc(), buttonId),
			router: this.views.getRouter(),
			destination: {
				id: 'eightbitstories.root',
			},
		})
	}
}

class SpyMetaSkillView extends MetaSkillViewController {
	public getCardVc() {
		return this.cardVc
	}
}
