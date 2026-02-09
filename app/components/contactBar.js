export default async function ContactBar({ email, phone }) {
  return (
    <div className="bg-blue-500 py-2 text-blue-200">
      <div className="container flex max-w-screen-xl flex-row flex-wrap items-center justify-between gap-x-6 gap-y-2 sm:justify-end">
        <a href={`tel:${phone.replaceAll(" ", "")}`}>
          <div className="flex items-end justify-between gap-2 text-sm transition-colors text-blue-200 hover:text-white sm:justify-end sm:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M8 16.25a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z" />
              <path
                fillRule="evenodd"
                d="M4 4a3 3 0 013-3h6a3 3 0 013 3v12a3 3 0 01-3 3H7a3 3 0 01-3-3V4zm4-1.5v.75c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75V2.5h1A1.5 1.5 0 0114.5 4v12a1.5 1.5 0 01-1.5 1.5H7A1.5 1.5 0 015.5 16V4A1.5 1.5 0 017 2.5h1z"
                clipRule="evenodd"
              />
            </svg>

            <div className="whitespace-nowrap">{phone}</div>
          </div>
        </a>
        <a href={`mailto:${email}`}>
          <div className="flex items-end justify-between gap-2 text-sm transition-colors text-blue-200 hover:text-white sm:justify-end sm:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <div className="">{email}</div>
          </div>
        </a>
      </div>
    </div>
  );
}
