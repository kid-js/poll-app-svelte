<script>
    import { disableScroll, enableScroll } from './helpers';
    import { getDeletePollModalTmpl } from './templates';

    import Header from './lib/Header.svelte';
    import Tabs from './shared/Tabs.svelte';
    import PollList from './lib/PollList.svelte';
    import AddPollForm from './lib/AddPollForm.svelte';
    import ConfirmModal from './shared/ConfirmModal.svelte';
    import Footer from './lib/Footer.svelte';

    import { polls } from './stores/stores';

    let tabs = ['Current Polls', 'Add New Poll'];
    let activeTab = 'Current Polls';
    let pickedPoll = null;
    let isConfirmModalShown = false;

    function handleTabSwitch(e) {
        activeTab = e.detail.tab;
    }

    function handleFormSubmit(e) {
        polls.add(e.detail.poll);
        activeTab = 'Current Polls';
    }

    function handleVote(e) {
        polls.upVote(e.detail.id, e.detail.option);
    }

    function initPollRemoving(e) {
        pickedPoll = e.detail.poll;
        showConfirmModal();
    }

    function showConfirmModal() {
        disableScroll();
        isConfirmModalShown = true;
    }

    function hideConfirmModal() {
        isConfirmModalShown = false;
        pickedPoll = null;

        enableScroll();
    }

    function handlePollRemoving() {
        deletePoll(pickedPoll);
        hideConfirmModal();
    }

    function deletePoll(poll = {}) {
        polls.delete(poll.id);
    }
</script>

<Header />

<Tabs {tabs} {activeTab} on:tabSwitch={handleTabSwitch} />

{#if activeTab === 'Current Polls'}
    <PollList {polls} on:vote={handleVote} on:delete={initPollRemoving} />
{:else}
    <AddPollForm on:formSubmit={handleFormSubmit} />
{/if}

{#if isConfirmModalShown}
    <ConfirmModal
        {...getDeletePollModalTmpl(pickedPoll.question)}
        on:cancel={hideConfirmModal}
        on:confirm={handlePollRemoving}
        on:click={hideConfirmModal}
    />
{/if}

<Footer />