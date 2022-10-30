-- Table: public.discuss

-- DROP TABLE IF EXISTS public.discuss;

CREATE TABLE IF NOT EXISTS public.pill
(
    source character varying(100) COLLATE pg_catalog."default",
    source_link character varying(100) COLLATE pg_catalog."default",
    id character varying(100) COLLATE pg_catalog."default" NOT NULL,
    title text COLLATE pg_catalog."default",
    cover_url character varying(100) COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    author character varying(100) COLLATE pg_catalog."default",
    link character varying(100) COLLATE pg_catalog."default",
    pub_date character varying(100) COLLATE pg_catalog."default",
    rec_date character varying(100) COLLATE pg_catalog."default",
    content text COLLATE pg_catalog."default",
    pill_type character varying(100) COLLATE pg_catalog."default",
    pill_belong character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT discuss_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pill
    OWNER to postgres;


    -- Table: public.comment

    -- DROP TABLE IF EXISTS public.comment;

    CREATE TABLE IF NOT EXISTS public.comment
    (
        id character varying(100) COLLATE pg_catalog."default" NOT NULL,
        pill_id character varying(100) COLLATE pg_catalog."default",
        author character varying(100) COLLATE pg_catalog."default",
        pub_date character varying(100) COLLATE pg_catalog."default",
        rec_date character varying(100) COLLATE pg_catalog."default",
        content text COLLATE pg_catalog."default",
        vote character varying(100) COLLATE pg_catalog."default",
        reply_ids character varying(100) COLLATE pg_catalog."default",
        avatar character varying(100) COLLATE pg_catalog."default",
        CONSTRAINT comment_pkey PRIMARY KEY (id)
    )

    TABLESPACE pg_default;

    ALTER TABLE IF EXISTS public.comment
        OWNER to postgres;
