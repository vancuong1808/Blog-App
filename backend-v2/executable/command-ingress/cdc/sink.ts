interface ISink {
    save : (data : any) => Promise<void>;
}

export {
    ISink,
}