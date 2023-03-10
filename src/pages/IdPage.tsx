import { useEffect } from "react";
import { wrapPromise } from "~/shared/lib";
import { mockUsersList } from "~/shared/mocks";
import { Link } from "react-router-dom";
import { useHashScroll } from "~/hooks";
import { HashLink } from "~/components";
import { useLocation } from "react-router-dom";

const fetchData = () =>
    new Promise<ReturnType<typeof mockUsersList>>((resolve) => {
        setTimeout(() => {
            resolve(mockUsersList());
        }, 3000);
    });

const resource = wrapPromise(fetchData);

const IdPage = () => {
    const _ = resource.read({ auto: true });

    const items = Array(30).fill(0);

    const location = useLocation();

    useHashScroll(location.hash); // this is for scroll when we're coming from other pages with a hash link

    useEffect(() => {
        // We don't clear in order not to to reload on link click
        return () => {
            resource.reset();
        };
    });

    return (
        <div>
            <h1>Id Page</h1>

            <h2>
                Visit :<Link to={`/id-page#page-section-16`}>Page ID 16 Section</Link>
                <br />
                Visit Hashed :<HashLink hash="#page-section-16">Page ID 16 Section</HashLink>
            </h2>

            <br />

            {items.map((_, index) => {
                return (
                    <div key={`page-section-${index + 1}`} id={`page-section-${index + 1}`}>
                        <hr />
                        <br />
                        <h2>Section {index + 1}</h2>
                        <br />
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores reiciendis voluptatum recusandae! A inventore facere perferendis, modi vel ad magni voluptatibus fuga fugit iste. Placeat vero dolorum earum natus fugiat!</p>
                        <br />
                        <hr />
                    </div>
                );
            })}
        </div>
    );
};

export default IdPage;
