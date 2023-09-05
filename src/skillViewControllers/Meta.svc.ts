import {
	AbstractSkillViewController,
	CardViewController,
	FormViewController,
	Router,
	SkillView,
	SkillViewControllerLoadOptions,
	ViewControllerOptions,
	buildForm,
} from '@sprucelabs/heartwood-view-controllers'
import { buildSchema } from '@sprucelabs/schema'

export default class MetaSkillViewController extends AbstractSkillViewController {
	public static id = 'meta'
	protected cardVc: CardViewController
	protected formVc: FormViewController<MetaSchema>
	private router!: Router

	public constructor(options: ViewControllerOptions) {
		super(options)

		this.formVc = this.FormVc()
		this.cardVc = this.CardVc()
	}

	private FormVc(): FormViewController<MetaSchema> {
		return this.Controller(
			'form',
			buildForm({
				schema: metaSchema,
				onCancel: this.handleClickBack.bind(this),
				onSubmit: this.handleClickSave.bind(this),
				sections: [
					{
						fields: [
							'name',
							{
								name: 'values',
								renderAs: 'textarea',
							},
						],
					},
				],
			})
		)
	}

	private CardVc(): CardViewController {
		return this.Controller('card', {
			header: {
				title: `Your Family`,
			},
			body: {
				sections: [
					{
						form: this.formVc.render(),
					},
				],
			},
		})
	}

	public async load(
		options: SkillViewControllerLoadOptions<Record<string, any>>
	): Promise<void> {
		const { router } = options
		this.router = router
	}

	private async handleClickSave() {
		await this.redirectToRoot()
	}

	private async handleClickBack() {
		await this.redirectToRoot()
	}

	private async redirectToRoot() {
		await this.router.redirect('eightbitstories.root')
	}

	public render(): SkillView {
		return {
			layouts: [
				{
					cards: [this.cardVc.render()],
				},
			],
		}
	}
}

const metaSchema = buildSchema({
	id: 'meta',
	fields: {
		name: {
			type: 'text',
			isRequired: true,
			label: 'Family Name',
		},
		values: {
			type: 'text',
			isRequired: true,
			label: 'Values',
		},
	},
})

export type MetaSchema = typeof metaSchema
