import {forwardRef, useEffect, useState} from "react";
import {useAppContext} from "../App";
import TextareaAutosize from "react-textarea-autosize";
import Dialog from "@mui/material/Dialog";
import {TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import {cancelIcon} from "../assets/icons";
import WriteNavbar from "../components/WriteNavbar";
import {useAuth} from "../contexts/Auth";
import {useQuery} from "@tanstack/react-query";
import {httpRequest} from "../interceptor/axiosInterceptor";
import {url} from "../baseUrl";
import {useNavigate, useParams} from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const INITAIL_POST_DATA = {title: "", markdown: "", tags: ""};

export default function Write() {
    const {hideNavbar} = useAppContext();
    const [post, setPost] = useState(INITAIL_POST_DATA);
    const navigate = useNavigate();
    const {postId} = useParams();
    const [hasPostId, setHasPostId] = useState(false);
    const [localDraft, setLocalDraft] = useLocalStorage(
        "draft",
        INITAIL_POST_DATA
    );
    const [showDraft, setShowDraft] = useState(false);

    useEffect(() => {
        if (postId) setHasPostId(true);
        setShowDraft(true);
        return () => setHasPostId(false);
    }, [postId]);

    useEffect(() => {
        hideNavbar(true);
        document.title = "New story -Medium";
        return () => hideNavbar(false);
    }, []);

    useEffect(() => {
        setPost(localDraft);
    }, [showDraft]);

    const {refetch: makePost} = useQuery({
        queryFn: () => {
            const params = new URLSearchParams();
            params.append("title", post.title);
            params.append("tags", post.tags);
            params.append("markdown", post.markdown);
            return httpRequest.post(`${url}/post`, params);
        },
        queryKey: ["new", "blog", "post"],
        enabled: false,
        onSuccess(data) {
            navigate(`/blog/${data.data.id}`);
        },
    });

    useQuery({
        queryFn: () => httpRequest.get(`${url}/post/${postId}`),
        queryKey: ["edit", "blog", "post", postId],
        enabled: hasPostId,
        onSuccess: (data) => {
            setPost({
                title: data.data.post.title,
                markdown: data.data.post.markdown,
                tags: data.data.post.tags,
            });
        },
    });

    const {refetch: updatePost} = useQuery({
        queryFn: () => {
            const params = new URLSearchParams();
            params.append("title", post.title);
            params.append("tags", post.tags);
            params.append("markdown", post.markdown);
            return httpRequest.patch(`${url}/post/${postId}`, params);
        },
        queryKey: ["blog", "post", "update", postId],
        enabled: false,
        onSuccess() {
            navigate(`/blog/${postId}`);
        },
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handletags = (val: string) => {
        setLocalDraft((prev) => ({...prev, tags: val}));
        setPost((prev) => {
            return {
                ...prev,
                tags: val,
            };
        });
    };

    const handlePublish = () => {
        if (hasPostId) {
            updatePost();
        } else {
            makePost();
        }
    };

    return (
        <>
            <WriteNavbar
                buttonText={hasPostId ? "Save" : "Publish"}
                onClick={handleClickOpen}
                disabled={!(post.title.length > 6 && post.markdown.length > 15)}
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",

                    width: "80%",
                    margin: "auto",
                    marginTop: "3vh",
                    gap: "22px",
                }}
            >
                <TextareaAutosize
                    autoFocus={true}
                    onChange={(e) => {
                        setLocalDraft((prev) => ({...prev, title: e.target.value}));
                        setPost((prev) => {
                            return {...prev, title: e.target.value};
                        });
                    }}
                    value={post.title}
                    placeholder="Title"
                    style={{
                        width: "100%",
                        fontSize: "45px",
                        border: "none",
                        outline: "transparent",
                        resize: "none",
                    }}
                />
                <TextareaAutosize
                    onChange={(e) => {
                        setLocalDraft((prev) => ({...prev, markdown: e.target.value}));
                        setPost((prev) => {
                            return {...prev, markdown: e.target.value};
                        });
                    }}
                    value={post.markdown}
                    className="hide_scroll"
                    placeholder="Tell your story..."
                    style={{
                        width: "100%",
                        fontSize: "20px",
                        border: "none",
                        outline: "transparent",
                        resize: "none",
                    }}
                />
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <DialogComponent
                        handleClose={handleClose}
                        title={post.title}
                        markdown={post.markdown}
                        handletags={handletags}
                        handlePublish={handlePublish}
                        tags={post.tags}
                        buttonText={hasPostId ? "Save now" : "Publish now"}
                    />
                </Dialog>
            </div>
        </>
    );
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComponent = ({
                             handleClose,
                             title,
                             markdown,
                             handletags,
                             handlePublish,
                             tags: tagsGiven,
                             buttonText,
                         }: {
    handleClose(): void;
    title: string;
    markdown: string;
    handletags(val: string): void;
    handlePublish(): void;
    tags: string;
    buttonText: string;
}) => {
    const [tags, setTags] = useState(tagsGiven);
    const {user} = useAuth();
    const test: string = markdown ?? "";
    const codeRegex = /<code>(.*?)<\/code>/g;
    const withoutCode = markdown.replace(codeRegex, "");
    var imgRegex = /<img.*?src=['"](.*?)['"]/;
    const image = imgRegex.exec(test)?.at(1);
    const htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
    const summary = withoutCode.replace(htmlRegexG, "");
    return (
        <>
            <div
                className="dialog_main"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "90vh",
                    alignItems: "center",
                }}
            >
                <div
                    className="wrapper_write_dialog"
                    style={{
                        width: "900px",
                        height: "350px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        className="left_write_dialog"
                        style={{width: "47%", display: "flex", flexDirection: "column"}}
                    >
                        <h4
                            style={{
                                marginTop: "0px",
                                marginBottom: "22px",
                                color: "rgb(61 61 61)",
                            }}
                        >
                            Story Preview
                        </h4>
                        <div
                            className="image_preview"
                            style={{
                                width: "100%",
                                height: "200px",
                                backgroundColor: "#fafafa",
                                color: "rgb(153 153 153)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            {image ? (
                                <img
                                    src={image}
                                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                                    alt="img"
                                />
                            ) : (
                                <p
                                    style={{width: "70%", fontSize: "14px", lineHeight: "22px"}}
                                >
                                    Include a high-quality image in your story to make it more
                                    inviting to readers.
                                </p>
                            )}
                        </div>
                        <h4
                            style={{
                                marginTop: "15pxpx",
                                marginBottom: "4px",
                                borderBottom: "2px solid #c1bdbd",
                                color: "rgb(61 61 61)",
                                paddingBottom: "5px",
                            }}
                        >
                            {title}
                        </h4>
                        <p
                            style={{
                                borderBottom: "2px solid #c1bdbd",
                                color: "rgb(153 153 153)",
                                paddingBottom: "15px",
                                marginTop: "5px",
                            }}
                        >
                            {summary.length > 112 ? summary.slice(0, 112) + " ..." : summary}
                        </p>
                    </div>
                    <div
                        className="right_write_dialog"
                        style={{
                            width: "47%",
                            display: "flex",
                            flexDirection: "column",
                            position: "relative",
                        }}
                    >
            <span
                onClick={handleClose}
                style={{
                    position: "absolute",
                    top: "-150px",
                    right: "-34px",
                    cursor: "pointer",
                }}
            >
              {cancelIcon}
            </span>
                        <p
                            style={{
                                fontWeight: "bold",
                                color: "rgb(113 112 112)",
                                fontSize: "15.8px",
                                marginBottom: "18px",
                            }}
                        >
                            Publishing to{" "}
                            <span style={{color: "rgb(61 61 61)"}}>{user?.name}</span>
                        </p>
                        <p style={{margin: "12px 0", color: "gray"}}>
                            Add or change topics (up to 5) so readers know what your story is
                            about
                        </p>
                        <input
                            value={tags}
                            onChange={(e) => {
                                setTags(e.target.value);
                                handletags(e.target.value);
                            }}
                            style={{
                                margin: "10px 0",
                                height: "45px",
                                border: "2px solid #eeecec",
                                backgroundColor: "#fafafa",
                                padding: "4px 8px",
                                outline: "transparent",
                            }}
                            type="text"
                            placeholder="Add topics followed by commas eg : Java,Typescript"
                        />
                        <button
                            onClick={() => {
                                tags.length > 0 && handlePublish();
                            }}
                            style={{
                                marginTop: "18px",
                                color: "white",
                                backgroundColor: tags.length > 0 ? "#1a8917" : "#cbe4ca",
                                border: "none",
                                outline: "transparent",
                                width: "fit-content",
                                padding: "10px 12px",
                                borderRadius: "17px",
                                cursor: "pointer",
                            }}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
