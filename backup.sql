PGDMP     	    (                |            marketswiss    10.23    10.23 M    l           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            m           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            n           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            o           1262    16393    marketswiss    DATABASE     �   CREATE DATABASE marketswiss WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Spain.1252' LC_CTYPE = 'Spanish_Spain.1252';
    DROP DATABASE marketswiss;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            p           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12924    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            q           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            U           1247    16488    enum_Trades_status    TYPE     N   CREATE TYPE public."enum_Trades_status" AS ENUM (
    'open',
    'closed'
);
 '   DROP TYPE public."enum_Trades_status";
       public       marketswiss_user    false    3            R           1247    16483    enum_Trades_type    TYPE     I   CREATE TYPE public."enum_Trades_type" AS ENUM (
    'buy',
    'sell'
);
 %   DROP TYPE public."enum_Trades_type";
       public       marketswiss_user    false    3            \           1247    16504    enum_Transactions_type    TYPE     W   CREATE TYPE public."enum_Transactions_type" AS ENUM (
    'deposit',
    'withdraw'
);
 +   DROP TYPE public."enum_Transactions_type";
       public       marketswiss_user    false    3            �            1259    18565    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         marketswiss_user    false    3            �            1259    16495    Trades    TABLE     �  CREATE TABLE public."Trades" (
    id integer NOT NULL,
    type public."enum_Trades_type" NOT NULL,
    asset character varying(255) NOT NULL,
    quantity numeric(10,2) NOT NULL,
    "entryPrice" numeric(10,4) NOT NULL,
    "exitPrice" numeric(10,4),
    status public."enum_Trades_status" DEFAULT 'open'::public."enum_Trades_status" NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Trades";
       public         marketswiss_user    false    597    594    597    3            �            1259    16493    Trades_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Trades_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Trades_id_seq";
       public       marketswiss_user    false    199    3            r           0    0    Trades_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Trades_id_seq" OWNED BY public."Trades".id;
            public       marketswiss_user    false    198            �            1259    16511    Transactions    TABLE       CREATE TABLE public."Transactions" (
    id integer NOT NULL,
    type public."enum_Transactions_type" NOT NULL,
    amount numeric(10,2) NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."Transactions";
       public         marketswiss_user    false    604    3            �            1259    16509    Transactions_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Transactions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Transactions_id_seq";
       public       marketswiss_user    false    201    3            s           0    0    Transactions_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Transactions_id_seq" OWNED BY public."Transactions".id;
            public       marketswiss_user    false    200            �            1259    16470    Users    TABLE     �  CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    balance numeric(10,2) DEFAULT 0 NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "alertPercentage" numeric(5,2) DEFAULT 10 NOT NULL
);
    DROP TABLE public."Users";
       public         marketswiss_user    false    3            �            1259    16468    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public       marketswiss_user    false    197    3            t           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
            public       marketswiss_user    false    196            �
           2604    16498 	   Trades id    DEFAULT     j   ALTER TABLE ONLY public."Trades" ALTER COLUMN id SET DEFAULT nextval('public."Trades_id_seq"'::regclass);
 :   ALTER TABLE public."Trades" ALTER COLUMN id DROP DEFAULT;
       public       marketswiss_user    false    198    199    199            �
           2604    16514    Transactions id    DEFAULT     v   ALTER TABLE ONLY public."Transactions" ALTER COLUMN id SET DEFAULT nextval('public."Transactions_id_seq"'::regclass);
 @   ALTER TABLE public."Transactions" ALTER COLUMN id DROP DEFAULT;
       public       marketswiss_user    false    200    201    201            �
           2604    16473    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public       marketswiss_user    false    197    196    197            i          0    18565    SequelizeMeta 
   TABLE DATA               /   COPY public."SequelizeMeta" (name) FROM stdin;
    public       marketswiss_user    false    202   jZ       f          0    16495    Trades 
   TABLE DATA               �   COPY public."Trades" (id, type, asset, quantity, "entryPrice", "exitPrice", status, "userId", "createdAt", "updatedAt") FROM stdin;
    public       marketswiss_user    false    199   �Z       h          0    16511    Transactions 
   TABLE DATA               ^   COPY public."Transactions" (id, type, amount, "userId", "createdAt", "updatedAt") FROM stdin;
    public       marketswiss_user    false    201   R[       d          0    16470    Users 
   TABLE DATA               r   COPY public."Users" (id, name, email, password, balance, "createdAt", "updatedAt", "alertPercentage") FROM stdin;
    public       marketswiss_user    false    197   �`       u           0    0    Trades_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Trades_id_seq"', 6, true);
            public       marketswiss_user    false    198            v           0    0    Transactions_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Transactions_id_seq"', 108, true);
            public       marketswiss_user    false    200            w           0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 6, true);
            public       marketswiss_user    false    196            �
           2606    18569     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public         marketswiss_user    false    202            �
           2606    16501    Trades Trades_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Trades"
    ADD CONSTRAINT "Trades_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Trades" DROP CONSTRAINT "Trades_pkey";
       public         marketswiss_user    false    199            �
           2606    16516    Transactions Transactions_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Transactions"
    ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."Transactions" DROP CONSTRAINT "Transactions_pkey";
       public         marketswiss_user    false    201            �
           2606    18793    Users Users_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);
 C   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key";
       public         marketswiss_user    false    197            �
           2606    18791    Users Users_email_key1 
   CONSTRAINT     V   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key1" UNIQUE (email);
 D   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key1";
       public         marketswiss_user    false    197            �
           2606    18803    Users Users_email_key10 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key10" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key10";
       public         marketswiss_user    false    197            �
           2606    18781    Users Users_email_key11 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key11" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key11";
       public         marketswiss_user    false    197            �
           2606    18805    Users Users_email_key12 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key12" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key12";
       public         marketswiss_user    false    197            �
           2606    18779    Users Users_email_key13 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key13" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key13";
       public         marketswiss_user    false    197            �
           2606    18807    Users Users_email_key14 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key14" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key14";
       public         marketswiss_user    false    197            �
           2606    18777    Users Users_email_key15 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key15" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key15";
       public         marketswiss_user    false    197            �
           2606    18809    Users Users_email_key16 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key16" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key16";
       public         marketswiss_user    false    197            �
           2606    18775    Users Users_email_key17 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key17" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key17";
       public         marketswiss_user    false    197            �
           2606    18811    Users Users_email_key18 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key18" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key18";
       public         marketswiss_user    false    197            �
           2606    18773    Users Users_email_key19 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key19" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key19";
       public         marketswiss_user    false    197            �
           2606    18795    Users Users_email_key2 
   CONSTRAINT     V   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key2" UNIQUE (email);
 D   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key2";
       public         marketswiss_user    false    197            �
           2606    18813    Users Users_email_key20 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key20" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key20";
       public         marketswiss_user    false    197            �
           2606    18771    Users Users_email_key21 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key21" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key21";
       public         marketswiss_user    false    197            �
           2606    18815    Users Users_email_key22 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key22" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key22";
       public         marketswiss_user    false    197            �
           2606    18769    Users Users_email_key23 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key23" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key23";
       public         marketswiss_user    false    197            �
           2606    18817    Users Users_email_key24 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key24" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key24";
       public         marketswiss_user    false    197            �
           2606    18767    Users Users_email_key25 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key25" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key25";
       public         marketswiss_user    false    197            �
           2606    18819    Users Users_email_key26 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key26" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key26";
       public         marketswiss_user    false    197            �
           2606    18765    Users Users_email_key27 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key27" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key27";
       public         marketswiss_user    false    197            �
           2606    18821    Users Users_email_key28 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key28" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key28";
       public         marketswiss_user    false    197            �
           2606    18763    Users Users_email_key29 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key29" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key29";
       public         marketswiss_user    false    197            �
           2606    18789    Users Users_email_key3 
   CONSTRAINT     V   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key3" UNIQUE (email);
 D   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key3";
       public         marketswiss_user    false    197            �
           2606    18823    Users Users_email_key30 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key30" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key30";
       public         marketswiss_user    false    197            �
           2606    18761    Users Users_email_key31 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key31" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key31";
       public         marketswiss_user    false    197            �
           2606    18825    Users Users_email_key32 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key32" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key32";
       public         marketswiss_user    false    197            �
           2606    18759    Users Users_email_key33 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key33" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key33";
       public         marketswiss_user    false    197            �
           2606    18827    Users Users_email_key34 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key34" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key34";
       public         marketswiss_user    false    197            �
           2606    18757    Users Users_email_key35 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key35" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key35";
       public         marketswiss_user    false    197            �
           2606    18829    Users Users_email_key36 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key36" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key36";
       public         marketswiss_user    false    197            �
           2606    18755    Users Users_email_key37 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key37" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key37";
       public         marketswiss_user    false    197            �
           2606    18831    Users Users_email_key38 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key38" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key38";
       public         marketswiss_user    false    197            �
           2606    18753    Users Users_email_key39 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key39" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key39";
       public         marketswiss_user    false    197            �
           2606    18797    Users Users_email_key4 
   CONSTRAINT     V   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key4" UNIQUE (email);
 D   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key4";
       public         marketswiss_user    false    197            �
           2606    18833    Users Users_email_key40 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key40" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key40";
       public         marketswiss_user    false    197            �
           2606    18751    Users Users_email_key41 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key41" UNIQUE (email);
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key41";
       public         marketswiss_user    false    197            �
           2606    18787    Users Users_email_key5 
   CONSTRAINT     V   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key5" UNIQUE (email);
 D   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key5";
       public         marketswiss_user    false    197            �
           2606    18799    Users Users_email_key6 
   CONSTRAINT     V   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key6" UNIQUE (email);
 D   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key6";
       public         marketswiss_user    false    197            �
           2606    18785    Users Users_email_key7 
   CONSTRAINT     V   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key7" UNIQUE (email);
 D   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key7";
       public         marketswiss_user    false    197            �
           2606    18801    Users Users_email_key8 
   CONSTRAINT     V   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key8" UNIQUE (email);
 D   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key8";
       public         marketswiss_user    false    197            �
           2606    18783    Users Users_email_key9 
   CONSTRAINT     V   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key9" UNIQUE (email);
 D   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key9";
       public         marketswiss_user    false    197            �
           2606    16479    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public         marketswiss_user    false    197            i      x������ � �      f   �   x���9�@E�Sp�/�,��� �K�C��(�=!Ē@�ʶ���r���-����,!" :�G�v�ӥ�;r�\W�+���hʐ0T(��dZj�<�������J�	2��t��!�I�z���4A�B6���_��/BI]�r�swxk6"���������!�(�.�}�f ���wpjw�      h   �  x���M�7�ׯN�X�DQ?}o8@�J���CM�̓Dv��P�VWS�&||������#x�����շ����pP:�����B�����_������F���Eφр@���(~����-�d��gEt����L�7�J�t��J6J�ۨ^��2g��P>�-^8�#4G�*i@hk &u�up��b� �&@����J5�>	B�UD|$�ш���y��}��� �覦�<�C�.	PaH�U<bs�4�j@�+J>-ߜU�@>Sٮl�WL�7BR�U��6���U3����F�"��.ߧ<�9N�p��fה.Γ��!�a�\kڨA�"�h@�q�p� ߃��B����$_V�pz#Ĵ֔Vy;Bv!ZO7 D^�p��6��qH�iD�w�b�rD�eW�ȉ\��Íq��X������(iD�C���R��OZv�@~�ꉇO�1�p�4�;��#$�ѕF����Z4�R�[9��OXk= �n��J&�☬�R�{ub:Bq���F�s&�B�\���+G��Y��Crd�������d;���>8�ّg#�#B��MVå`�n>���cR;ʌ����rʋ�E�4#��|�StI}�AJ�Q�m�<	�M�j�>%�z��R�=X�2�I3TI��jݖ�����6"$�nC�]��ʶ����F/�ۊ��`�;܌�a[S�;y#�#of����G(�2�L��D�+�����j61��|�����fK�$|Ɨ2"�6�].��j��x��.o��bF�M��R�A$�J�����?�r�j���y��eD���\�08#����y� i���,��wy�c�c�F|A���[��8��rU��}?���C]_݂�!�)K�ֹbA�����w��!�G\���a[u�� �����!��ʂ����K`�� ����S.g?u�]�&�"�f-�r^����7�<9R_݂P6	?�,�G%|F(����ₚ��r��e;;���Է2#��N��{��iF(�~�Ny�YD�ӌP6?�������)/2 _��B�����\S�jz!�M���2�$ݝf�����1����)�Γ�3B�d���.�O�B��.~�{	��t3B�f��6���n3����n7#��;5I���EP�o	���*��ж	��"��	f�6����QZ5[NB�t�Sn��B��O9ɋ�����~��tQ��m�x�.�����m�����.uu� �͜��bDum� ��.^��ܰ=��I!��.��G��=J!H!ۢR�~-%V���KO��˪j@bu�������_�s���.�/=��i�Fb��΋��T>�k� �RI7��Udo<���JE=O�>p�����f$V*��*���\��D�T�W#z\4Sn�iD�� ��`Y�      d   5  x�u�Ks�0�u�,�m�D���**V��❻AH-ZP(/��]8ܶ�����/��`0��H2E"*p��?�t���)�}��Aqܷph�j�Ĭ�{�OF����@�ڎ{,��Ѷ�|C�\O�
������G�Hqq�@E��h��9�r�B���������O������'�;[
�:��n��3����d�>��n/�*���,�"����Yf�0Em'��ʩ�	�����ni��k�^o���)��(n�H��.x�1_zg�5/�ۏm����!\�S��\;�5��EQf^2�����Jq�x.eZKwm)W(�1��H�%>ӛ/��߀�Q��8ܯ�S�B�GO'�el	]�/�����U��7S���
����8�MxX�-���Q�0Ȕ�Nf���+�3���|]DM��_}Pk_L���r�X�S��(ٗ@5�U�/�l���tt7-!�-�B'*TT��X?DܼQ�d`zz���I�C]�$�Q���y۽�/�2��b�뷼�U���[!�/�04��?	�f��\� #��?	�H�'����N�E�     