<script setup lang="ts">
const step = ref<'language' | 'template'>('template');

interface CardItem<T> {
	title: string;
	icon: string;
	type: T;
}

// Step 1
type Language = 'javascript' | 'typescript';

const language = ref<Language>('typescript');
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

const template = ref<Template>('vanilla');
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
	step.value = 'template';
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
					<ScaffoldCard v-for="(lang, index) in languages" :key="index" v-bind="lang" @click="selectLanguage(lang.type)" />
				</UPageGrid>
			</UPageBody>
		</UPage>

		<UPage v-if="step === 'template'">
			<UPageHeader
				headline="Step 2"
				title="Template"
				description="What template or framework would you like to be scaffolded for?"
			/>

			<UPageBody>
				<UPageGrid class="grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
					<ScaffoldCard v-for="(temp, index) in templates" :key="index" v-bind="temp" @click="selectTemplate(temp.type)" />
				</UPageGrid>
			</UPageBody>
		</UPage>
	</UContainer>
</template>
