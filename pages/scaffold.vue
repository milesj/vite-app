<script setup lang="ts">
type Step = 'language' | 'template' | 'location' | 'review';
const step = ref<Step>('language');

interface CardItem<T> {
	title: string;
	icon: string;
	type: T;
}

function goTo(value: Step) {
	return () => {
		step.value = value;
	};
}

// Step 1
type Language = 'javascript' | 'typescript';

const language = ref<Language>();
const languages: CardItem<Language>[] = [
	{
		title: 'JavaScript',
		icon: 'i-devicon-javascript',
		type: 'javascript',
	},
	{
		title: 'TypeScript',
		icon: 'i-devicon-typescript',
		type: 'typescript',
	}
];

function selectLanguage(lang: Language) {
	language.value = lang;
	step.value = 'template';
}

// Step 2
type Template = 'vanilla' | 'vue' | 'react' | 'preact' | 'lit' | 'svelte' | 'solid' | 'qwik';

const template = ref<Template>();
const templates: CardItem<Template>[] = [
	{
		title: 'Vanilla',
		icon: 'i-devicon-javascript',
		type: 'vanilla',
	},
	{
		title: 'Vue',
		icon: 'i-devicon-vuejs',
		type: 'vue',
	},
	{
		title: 'React',
		icon: 'i-devicon-react',
		type: 'react',
	},
	{
		title: 'Preact',
		icon: 'i-devicon-reactnavigation',
		type: 'preact',
	},
	{
		title: 'Lit',
		icon: 'i-devicon-packer',
		type: 'lit',
	},
	{
		title: 'Svelte',
		icon: 'i-devicon-svelte',
		type: 'svelte',
	},
	{
		title: 'Solid',
		icon: 'i-devicon-solidjs',
		type: 'solid',
	},
	{
		title: 'Qwik',
		icon: 'i-devicon-qwik',
		type: 'qwik',
	},
];

function selectTemplate(temp: Template) {
	template.value = temp;
	step.value = 'location';
}

// Step 3
const location = ref('');

async function selectLocation() {
	const [data] = await window.api.openProject(false);

	if (data) {
		location.value = data.dir;
		step.value = 'review';
	}
}
</script>

<template>
	<UContainer>
		<UPage v-if="step === 'language'">
			<UPageHeader
				headline="Step 1"
				title="Language"
				description="What language would you like files to be scaffolded in?"
			/>

			<UPageBody>
				<UPageGrid>
					<ScaffoldCard
						v-for="(lang, index) in languages"
						v-bind="lang"
						:key="index"
						:selected="lang.type === language"
						@click="selectLanguage(lang.type)"
					/>
				</UPageGrid>
			</UPageBody>
		</UPage>

		<UPage v-if="step === 'template'">
			<UPageHeader
				headline="Step 2"
				title="Template"
				description="What template or framework would you like to be scaffolded?"
					:links="[{ label: 'Back', icon: 'i-heroicons-arrow-left-circle', click: goTo('language') }]"
			/>

			<UPageBody>
				<UPageGrid class="grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
					<ScaffoldCard
						v-for="(temp, index) in templates"
						v-bind="temp"
						:key="index"
						:selected="temp.type === template"
						@click="selectTemplate(temp.type)"
					/>
				</UPageGrid>
			</UPageBody>
		</UPage>

		<UPage v-if="step === 'location'">
			<UPageHeader
				headline="Step 3"
				title="Location"
				description="Where would you like to scaffold the project?"
				:links="[{ label: 'Back', icon: 'i-heroicons-arrow-left-circle', click: goTo('template') }]"
			/>

			<UPageBody>
				<div class="mb-8">
					<UFormGroup label="Project directory">
						<UInput v-model="location" icon="i-heroicons-folder" size="lg" disabled />
					</UFormGroup>
				</div>

				<div class="text-center">
					<UButton label="Select directory" size="xl" class="font-bold" @click="selectLocation" />

					<UButton v-if="location !== ''" label="Continue" size="xl" variant="ghost" class="font-bold ml-4" @click="step = 'review'" />
				</div>
			</UPageBody>
		</UPage>


		<UPage v-if="step === 'review'">
			<UPageHeader
				headline="Step 4"
				title="Review"
				description="Review the information below and scaffold when ready!"
				:links="[{ label: 'Back', icon: 'i-heroicons-arrow-left-circle', click: goTo('location') }]"
			/>

			<UPageBody>
				<ScaffoldField title="Language" description="The language of scaffolded files." :value="language" />

				<ScaffoldField title="Template" description="The pre-built template to use." :value="template" />

				<ScaffoldField title="Location" description="The destination path to write to." :value="location" />

				<div class="text-center">
					<UButton label="Scaffold project" size="xl" class="font-bold" />
				</div>
			</UPageBody>
		</UPage>
	</UContainer>
</template>
