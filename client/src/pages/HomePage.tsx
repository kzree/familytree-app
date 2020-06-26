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
    <div className="home-greeting">
        <div className="home-greeting__img"></div>
        <div className="home-greeting__container">
            <div className="home-greeting__text-area">
                <div className="home-greeting__text home-greeting__text--header">Document your history</div>
                <div className="home-greeting__text home-greeting__text--body">
                    Join thousands other users in documenting your family history. It is easy and takes only a couple of
                    minutes to get started!
                </div>
            </div>
            <Button handleClick={() => handleClick()} buttonText="Get started" size="big" theme="main" />
        </div>
    </div>
);

const HomeLower = () => (
    <div className="lower-panels">
        <HomePagePanel title="Population" path="/viewall" buttonText="View statistics" theme={1} />
        <HomePagePanel title="Statistics" path="/statistics" buttonText="View list of all" theme={0} />
        <HomePagePanel title="Search relatives" path="/search" buttonText="Search" theme={1} />
    </div>
);

export const HomePage = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <div className="home-wrap">
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <AddSelection />
            </Modal>
            <Greeting handleClick={() => setModalOpen(true)} />
            <HomeLower />
        </div>
    );
};

export default HomePage;
