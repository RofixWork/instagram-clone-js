import { useEffect, useState } from "react";
import UserSuggest from "./UserSuggest";
import { faker } from "@faker-js/faker";
const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const users = [...Array(5)].map((_, index) => {
      return {
        id: faker.datatype.uuid(),
        avatar: faker.internet.avatar(),
        username: faker.internet.userName(),
        company: faker.company.name(),
      };
    });

    setSuggestions(users);
  }, []);
  return (
    <div className="mt-5 space-y-4">
      <div className="flex justify-between items-center ">
        <h4 className="text-gray-400 text-sm">Suggestions for you</h4>
        <p className="text-sm text-gray-700 hover:text-gray-900 transition-colors cursor-pointer">
          See All
        </p>
      </div>
      {suggestions?.length
        ? suggestions?.map((user) => {
            return <UserSuggest key={user?.id} {...user} />;
          })
        : null}
    </div>
  );
};

export default Suggestions;
