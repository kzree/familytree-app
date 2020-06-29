import React, { useState } from 'react';
import Button from '../components/Button';
import '../style/Index.scss';
import Modal from '../components/Modal';
import AddSelection from '../components/AddSelection';
import HomePagePanel from '../components/HomePagePanel';

interface GreetingProps {
    handleClick: VoidFunction;
}

const Greeting = ({ handleClick }: GreetingProps) => (
    <section className="home-greeting">
        <div className="home-greeting__img"></div>
        <div className="home-greeting__container">
            <div className="home-greeting__text-area">
                <h2 className="home-greeting__text home-greeting__text--header">Document your history</h2>
                <p className="home-greeting__text home-greeting__text--body">
                    Join thousands other users in documenting your family history. It is easy and takes only a couple of
                    minutes to get started!
                </p>
            </div>
            <Button handleClick={() => handleClick()} buttonText="Get started" size="big" theme="main" />
        </div>
    </section>
);

const HomeLower = () => (
    <section className="lower-panels">
        <HomePagePanel title="Population" path="/viewall" buttonText="View list of all" theme={1} />
        <HomePagePanel title="Statistics" path="/statistics" buttonText="View statistics" theme={0} />
        <HomePagePanel title="Search relatives" path="/search" buttonText="Search" theme={1} />
    </section>
);

export const HomePage = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <main className="home-wrap">
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <AddSelection />
            </Modal>
            <Greeting handleClick={() => setModalOpen(true)} />
            <HomeLower />
        </main>
    );
};

export default HomePage;
