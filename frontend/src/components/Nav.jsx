import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'; // Import Link from react-router-dom
import { fetchUserDetails, logoutUser } from '../authSlice';
import { useEffect } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Add Images', href: '/add-image', current: false },
  { name: 'Reorder Images', href: '/image-reorder', current: false },
  { name: 'Image Gallery', href: 'image-gallery', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Nav() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user); // Update with the correct path to user state
    const authTokens = useSelector((state) => state.auth.authTokens);
    
    useEffect(() => {
        if (authTokens) {
            dispatch(fetchUserDetails());
        }
    }, [authTokens, dispatch]);
  const handleLogout = () => {
        dispatch(logoutUser());
      };
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="Profile_pic"
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhUIBxITFRUVGRgbGBYYGBcUFRsYFRUXFh0VFh8YHighGBolHRcYITEhJTUrLi4uGB81OjUtNygtLisBCgoKDQ0NEA0NGisZExkrLSsrKysrKysrKysrKzcrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAcAAEAAwADAQEAAAAAAAAAAAAABgcIAwQFAgH/xABCEAACAQIDBAUJAgwHAAAAAAAAAQIDBAUGEQchUYESMUFhkRMUIjJScXKhwUKxFyMkMzRDU4KSorLCCBUWYmOT0f/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8AvEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8yaitWVDnza0repLDsrtSktVK4fpQT7VSX2vie7hr1gWfi2M4bg9Hy2J1qdKPGclHX3LrfIheIbYss20nG18vW74w6MfGo19xQt9eXOIXLub2pOpN9cptyl4s4AsXb+G/Dtf0Svp8dPXwPUw7bFlm6ko3Sr0e+UOlHxpt/cZ+AI1rhOM4bjFDy+F1qdWP+ySlp711rmeiZAsby5w+6VzZVJ05rqlBuMvFFwZD2sq4qRw/NLjGT0UbhLowb7FVXVD4lu46dYIt8HzFqS1R9BAAAAAAAAAAAAAAAAAAAACO59x5ZbyvVxBevp0aa41J7o+HXyArjbHnqcq0st4TLRLdXmutv8AYp8Pa8OJUR+1JzqVHUqNttttve23vbfefgaAAAAAAAAW7scz1ONaOW8WlqnuoTfWn+xb4ez4cC6THVOc6c1Om2mmmmtzTT1TXejUeQseWZMr0sQl6+nRqLhUhul49fMJqRAAIAAAAAAAAAAAAAAAAFM/4gMRbna4XF7vTqy73+bj/eXMZ+27VHPOcYvsoQXjOowYroABoAAAAAAAALg/w/4i1UucLk93oVY9z/Ny/tKfLF2E1HDOcortoTXhOmwmtAgAIAAAAAAAAAAAAAAAAFEbfbSVPMVC703TouPOnUf0qIvcrvbZgssTyl57RWsraXT7+g90/Dc/3QM+gANAAAAAAAABZ+wK0lUzFXu9N0KKjzqVF9KbKwNBbE8FeG5T89qrSVzLp9/QS6MPq+YTViAAIAAAAAAAAAAAAAAAAHFXowuKTpVUnGSaae9NNaNM5QBl3PuVq2VMelatN0payoy4w9lv249T5PtI2aqzZluwzRhTsb9d8Jr14T7JR+q7UZwzXlXE8r33kMRj6Lb6FVJ9Ca7n2PjF718wuPEAAUAAAA9zKmVcTzRfeQw+Pop+nVafQgu99r4RW9/MDsZBytWzXj0bVJqlHSVaXCGvqp+3LqXN9hpyhRp0KKo0klGKSiluSSWiS5Hk5Ty3YZXwpWNgu+c36859spfRdiPcDIAAAAAAAAAAAAAAAAAABw3FxStqLrXElGMU25SajFJdrb6jr4riVrhVjO9v5qFOC1lJvdp9W+pLtM75+z5fZruXRp607aL1jT7ZadU6vF93UvfvAse+2yYPQxlWttTnUo6tTrLdzpxe+a8O7Um9OeD5owjpR8lcUKi7dJxfvXY1yaMonoYJjuKYDdec4RWlTfalvjLulF7p8wsWzmPYvb1putl2t5PX9XV1lDlNekuepA8R2a5tsXo7V1FxpyjNPlrr8iY4FtrqRSp4/b68Z0Xp4wm/uZMrHallC7hrK48m+FSE4vx0a+YFE/6PzN0uj5jdf9Uv/D08O2a5tvpaRtXTXGrKNNLlq38i8/8AXuU9NfPrf+M8++2pZQtIaxuHUfCnCc346JfMFRjLexe3pTVbMVbyn/HS1jDnN+k+WhYtSpg+VsI6U/JW9CmurdCPJdrfNsq/HdtdSUXTwG304TrPXwhD6srLG8dxTHrrznF60qj7E90Y90YrdDkBc1htkwevjMrW5pzp0dyhWe/nUgt8F3rXv0LIt7ilc0VWt5KUZJNSTUotPqaa6zIBL8hZ8vsp3Ko1NaltJ+lS7Y8Z0uD7up+/eCNLg6OFYja4tYQvrCcZ05rWMk92n0fY12HeCAAAAAAAAAAAAAAfE5KMelLsPsrbbTmeWEYGsJtJaVLnVNrrjSXrP971fECu9qOdZ5lxTzSyl+TUW+jpuVSS3Oq+72e7f2kGADQAAAAAasAAAAAAAE42XZ0llrFfNL2X5NWa6Wu9U5Pcqq7uyXdv7DRcJKUelEx4X7sWzPLFsDeFXcm6ltolq9XKk/V/h9XwCaskABAAAAAAAAAAAGZd2i408ezfXuovWEZeTp8OhT3ar3vV8zRWbMQ/yrLVxfrc6dKbXxdHSPzaMo7+0LgAAoAAAAAAAAAAAAAEk2d408BzdQupPSEpKnU4dCpubfuej5EbG/sA2MgePlK//wA1yzb373upSg38XRSl80z2AyAAAAAAAAAACE7Yq7o5ArpfadOPJ1Ya/cZvNI7XbKre5DrqjvcOhU04xpzTl8tXyM3BcAAFAAAAAAAAAAAAAAAAaQ2OV3WyBQT+y6keSqz0+8mxCtkNlVssh0FW3OfTqJcI1JuUflo+ZNQyAAAAAAAAAADiq04Vqbp1EnFppp7009zTM7bRsgXWWbqV5Yxc7WT3S63T1/V1O7hLq47+vRxx1IQqwcKiTT601qtODQGPQX5mjZFg+Jydxg8vNpvX0UulRb+HrjyencVljezXNOESbdDy0Pao/jFp8O6S8AtRAH1WpVLep5OvFxfCScZLkz5CgAAAAAAAAPqjSncVPJ0IucuEU5SfJEtwTZrmnF2pKh5GHtVvxe74d8n4ARAnGznIF1ma6jeX0XC1i98up1NP1dPu4y6uG/qsTK+yHCMMkrjGJeczX2WujRT+HrnzencWNTpwpQUKaSS6klotOCQSvylThRpqnTSUUkkluSS3JI5QAgAAAAAAAAAAAAAAADqXmHWV/DoX9KnUXCcIzXzRHL3ZvlC8blO0hF8ablT/AKGkS4AVzcbGssVd9KVzD3VFJfzxZ0J7EsJl6l1cLlTf0LVAFTfgQw/X9MrfwUzkhsSwmPr3Vw+VNfQtUAVzb7G8sU99WVzP31FFfyRR7Fls3yhZvpQtISfGo5VP620S4AdSzw6ysIdCwpU6a4QhGC+SO2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/Z"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    {user.username}
                  </a>
                </MenuItem>
                <MenuItem>
                  <NavLink to="reset-password" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Reset Password
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 cursor-pointer">
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
