"use client";
import { useState } from "react";
import Image from "next/image";

const CopyModalButton = ({
  userImg,
  linkName,
}: {
  userImg: string;
  linkName: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <Image
        src="/assets/share.svg"
        alt="heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
        onClick={() => setIsOpen(true)}
      />

      <SpringModal
        isOpen={isOpen}
        href={linkName}
        setIsOpen={setIsOpen}
        userImg={userImg}
      />
    </div>
  );
};

const SpringModal = ({
  isOpen,
  setIsOpen,
  userImg,
  href,
}: {
  isOpen: boolean;
  setIsOpen: any;
  userImg: string;
  href: string;
}) => {
  const pathname = window.location.href;

  const isCommentWhatsappPage = () => {
    switch (true) {
      case pathname.includes("/thread/"):
        return `https://wa.me/?text=${pathname}`;
        break;
      case pathname.includes("/profile"):
        const userId = pathname.split("/profile/")[1];
        const base = pathname.split(`/profile/${userId}`)[0];
        const newUrl = `https://wa.me/?text=${base}/thread/${href}`;

        return newUrl;
        break;
      case pathname.includes("/"):
        return `https://wa.me/?text=${pathname}thread/${href}`;
        break;
      default:
        return "error";
    }
  };

  const isCommentInstagramPage = () => {
    switch (true) {
      case pathname.includes("/thread/"):
        return `https://www.instagram.com/?url=${pathname}`;
        break;
      case pathname.includes("/profile"):
        const userId = pathname.split("/profile/")[1];
        const base = pathname.split(`/profile/${userId}`)[0];
        const newUrl = `https://www.instagram.com/?url=${base}/thread/${href}`;
        return newUrl;
        break;
      case pathname.includes("/"):
        return `https://www.instagram.com/?url=${pathname}thread/${href}`;
        break;
      default:
        return "error";
    }
  };

  const CopySnackbar = ({ open }: { open: any }) => {
    return (
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#4CAF50",
          color: "white",
          padding: 10,
          borderRadius: 5,
          display: open ? "block" : "none",
        }}
      >
        URL Copied!
      </div>
    );
  };

  const isCommentCopyPage = () => {
    switch (true) {
      case pathname.includes("/thread/"):
        return `${pathname}`;
        break;
      case pathname.includes("/profile"):
        const userId = pathname.split("/profile/")[1];
        const base = pathname.split(`/profile/${userId}`)[0];
        const newUrl = `${base}/thread/${href}`;
        return newUrl;
        break;
      case pathname.includes("/"):
        return `${pathname}thread/${href}`;
        break;
      default:
        return "error";
    }
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const copyToClipboard = () => {
    const urlToCopy = isCommentCopyPage();
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        setSnackbarOpen(true);
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 3000); // Close snackbar after 3 seconds
      })
      .catch((error) => {
        console.error("Failed to copy: ", error);
        alert("Failed to copy URL.");
      });
  };

  return (
    <div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-2 border-2 border-primary-500 text-white p-6 rounded-lg w-full max-w-md shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <img
                  src={userImg}
                  alt="userImg"
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Share With Friends, Family, Colleagues😉
              </h3>
              <div className="flex flex-row items-center gap-7 justify-center mt-5">
                <a href={isCommentInstagramPage()}>
                  <Image
                    src="/assets/instagram.svg"
                    alt="Instagram"
                    width={30}
                    height={30}
                    className="cursor-pointer object-contain"
                  />
                </a>
                <a target="blank" href={isCommentWhatsappPage()}>
                  <Image
                    src="/assets/whatsapp.svg"
                    alt="Whatsapp"
                    width={30}
                    height={30}
                    className="cursor-pointer object-contain"
                  />
                </a>
                <Image
                  src="/assets/hyperlink-linked-icon.svg"
                  alt="Hyperlink"
                  width={25}
                  height={25}
                  className="cursor-pointer object-contain"
                  onClick={copyToClipboard}
                />
                <CopySnackbar open={snackbarOpen} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopyModalButton;
